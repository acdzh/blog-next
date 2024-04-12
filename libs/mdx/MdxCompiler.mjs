import chokidar from 'chokidar';
import fs from 'fs';
import { glob } from 'glob';
import npath from 'path';

const DEFAULT_OPTIONS = {
  module: {
    rules: [],
  },
  plugins: [],
};

/*
 * This is a very simple SyncHook.
 */
class SyncHook {
  constructor(args) {
    this.taps = [];
    this._args = args;
  }

  tap(name, fn) {
    this.taps.push({ name, fn });
  }

  call(...args) {
    try {
      this.taps.forEach((tap) => tap.fn(...args));
    } catch (error) {
      console.error(error);
    }
  }
}

/*
 * This is a compiler like webpack, but it compiles multiple files to multiple files.
 */
export class MdxCompiler {
  constructor(options) {
    this.options = this.parseOptions(options);
    this.hooks = {
      compile: new SyncHook([]),
      load: new SyncHook(['name']),
      'after-load': new SyncHook(['name']),
      watch: new SyncHook([]),
      done: new SyncHook([]),
    };
    this.registerPlugins();
  }

  static mergeOptions(options, defaultOptions) {
    if (Array.isArray(defaultOptions) || typeof defaultOptions === 'function') {
      return options ? options : defaultOptions;
    }
    const _options = {};
    Object.entries(defaultOptions).forEach(([key, value]) => {
      _options[key] = options[key] === undefined ? value : MdxCompiler.mergeOptions(options[key], value);
    });
    Object.entries(options).forEach(([key, value]) => {
      if (defaultOptions[key] === undefined) {
        _options[key] = value;
      }
    });
    return _options;
  }

  static toArray(obj) {
    return Array.isArray(obj) ? obj : [obj];
  }

  parseOptions(options) {
    const _options = MdxCompiler.mergeOptions(options, DEFAULT_OPTIONS);
    if (!_options.input) this.emitError(new Error('input is required'));
    if (!_options.output) this.emitError(new Error('output is required'));
    if (!npath.isAbsolute(_options.input)) _options.input = npath.resolve(_options.input);
    if (!npath.isAbsolute(_options.output)) _options.output = npath.resolve(_options.output);
    _options.module.rules = _options.module.rules.map((rule) => {
      if (!rule.test) this.emitError(new Error('rule.test is required'));
      if (Object.prototype.toString.call(rule.test) !== '[object RegExp]')
        this.emitError(new Error('rule.test must be regexp'));
      if (!rule.use) this.emitError(new Error('rule.use is required'));
      const uses = MdxCompiler.toArray(rule.use).reverse();
      return {
        test: rule.test,
        use: uses.map((use) => {
          switch (typeof use) {
            case 'function':
              return {
                loader: use,
                options: {},
              };
            case 'object':
              if (Array.isArray(use)){
                if (!use[0]) this.emitError(new Error('rule.use.loader is required'));
                if (typeof use[0] !== 'function') this.emitError(new Error('rule.use.loader must be function'));
                const [loader, options] = use;
                return { loader, options };
              } else {
                if (!use.loader) this.emitError(new Error('rule.use.loader is required'));
                if (typeof use.loader !== 'function') this.emitError(new Error('rule.use.loader must be function'));
                return {
                  loader: use.loader,
                  options: use.options || {},
                };
              }
            default:
              this.emitError(new Error('rule.use must be string or object'));
              return {};
          }
        }),
        raw: rule.raw,
      };
    });
    return _options;
  }

  registerPlugins() {
    this.options.plugins.forEach((plugin) => {
      plugin.apply(this);
    });
  }

  emitLog(message) {
    console.log(message);
  }

  emitWarning(warning) {
    console.warn(`\x1b[33m[WARNING]\x1b[0m ${warning.message || warning}`);
  }

  emitError(error, panic = true) {
    console.error(`\x1b[31m[ERROR]\x1b[0m ${error.message}`);
    if (panic) throw error;
  }

  emitFile(name, content) {
    const { output } = this.options;
    const destPath = npath.join(output, name);
    const destDirPath = npath.dirname(destPath);
    if (!fs.existsSync(destDirPath)) fs.mkdirSync(destDirPath, { recursive: true });
    if (Buffer.isBuffer(content)) fs.writeFileSync(destPath, content);
    else fs.writeFileSync(destPath, content, 'utf8');
  }

  copyFile(name) {
    const { input, output } = this.options;
    const srcPath = npath.join(input, name);
    const destPath = npath.join(output, name);
    const destDirPath = npath.dirname(destPath);
    if (!fs.existsSync(destDirPath)) fs.mkdirSync(destDirPath, { recursive: true });
    fs.copyFileSync(srcPath, destPath);
  }

  async loadFile(_name) {
    let name = _name;
    const { input } = this.options;
    this.hooks.load.call(name);
    const srcPath = npath.join(input, name);

    const use = [];
    let raw = false;
    for (const rule of this.options.module.rules) {
      if (!rule.test.test(name)) continue;
      raw = rule.raw ?? false;
      use.push(...rule.use);
    }

    if (use.length === 0) {
      this.copyFile(name);
    } else {
      let content = fs.readFileSync(srcPath, raw ? undefined : 'utf8');
      for (const { loader, options } of use) {
        try {
          const result = await loader.bind(this)(content, name, options);
          if (Array.isArray(result)) {
            [content, name] = result;
          } else {
            content = result;
          }
        } catch (error) {
          this.emitError(error, false);
          this.emitError(new Error(`Load ${srcPath} failed!`));
        }
      }
      this.emitFile(name, content);
    }
    this.hooks['after-load'].call(name);
  }

  async compile() {
    const { input } = this.options;
    this.hooks.compile.call();
    const names = glob.sync(npath.join(input, '**/*.*'), { nodir: true }).map((path) => npath.relative(input, path));
    await Promise.all(names.map(this.loadFile.bind(this))).catch((error) => {
      this.emitError(error);
    });
    this.hooks.done.call();
  }

  async watch() {
    const { input } = this.options;
    await this.compile();

    this.hooks.watch.call();
    chokidar.watch([input]).on('all', async (event, path) => {
      if (event === 'change') {
        try {
          await this.loadFile(npath.relative(input, path));
        } catch (error) {
          // do nothing
        }
        try {
          this.hooks.done.call();
        } catch (error) {
          this.emitError(error, false);
        }
      }
    });
  }

  async run() {
    await this.compile();
  }
}

