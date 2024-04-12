import npath from 'path';

export class MdxLoggerPlugin {
  constructor(config) {
    this.config = {};
    this.config.whitelist = config.whitelist ?? [];
    this.config.blacklist = config.blacklist ?? [];
  }

  isNameOk(name) {
    const ext = npath.extname(name);
    const { whitelist, blacklist } = this.config;
    if (blacklist.length > 0 && blacklist.includes(ext)) {
      return false;
    }
    if (whitelist.length > 0 && !whitelist.includes(ext)) {
      return false;
    }
    return true;
  }

  apply(compiler) {
    compiler.hooks.compile.tap('LoggerPlugin', () => {
      const { input, output } = compiler.options;
      compiler.emitLog('Start to compile...');
      compiler.emitLog(`\x1b[32mFrom\x1b[0m ${input} \x1b[32mTo\x1b[0m ${output}`);
    });
    compiler.hooks.watch.tap('LoggerPlugin', () => {
      compiler.emitLog('Start to watching...');
    });
    compiler.hooks.load.tap('LoggerPlugin', (name) => {
      this.isNameOk(name) && compiler.emitLog(`  \\___ \x1b[36m[START]\x1b[0m ${name}`);
    });
    compiler.hooks['after-load'].tap('LoggerPlugin', (name) => {
      this.isNameOk(name) && compiler.emitLog(`  \\____ \x1b[32m[DONE]\x1b[0m ${name}`);
    });
    compiler.hooks.done.tap('LoggerPlugin', () => {
      compiler.emitLog('Compile done!');
    });
  }
}
