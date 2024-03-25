import config from './mdx.config.mjs';
import { MdxCompiler } from './MdxCompiler.mjs';

const webpackPluginOption = {};

let isInitialized = false;

// webpack plugin
class WebpackPlugin {
  constructor(pluginOptions) {
    this.pluginOptions = pluginOptions;
    this.MdxCompiler = new MdxCompiler(config);
  }

  apply(compiler) {
    compiler.hooks.beforeCompile.tapPromise(
      'ContentlayerWebpackPlugin',
      async () => {
        if (isInitialized) {
          return;
        }
        console.log(isInitialized);
        isInitialized = true;
        if (compiler.options.mode === 'development') {
          await this.MdxCompiler.watch();
        } else {
          await this.MdxCompiler.run();
        }
      },
    );
  }
}

// nextjs plugin
export const withNextMdx = (
  nextConfig = {},
) => ({
  ...nextConfig,
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000, // extend `maxInactiveAge` to 1 hour (from 15 sec by default)
    ...nextConfig.onDemandEntries, // use existing onDemandEntries config if provided by user
  },
  webpack(config, options) {
    config.plugins.push(new WebpackPlugin(webpackPluginOption));
    // NOTE workaround for https://github.com/vercel/next.js/issues/17806#issuecomment-913437792
    // https://github.com/contentlayerdev/contentlayer/issues/121
    config.module?.rules?.push({
      test: /\.m?js$/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
    });
    if (typeof nextConfig.webpack === 'function') {
      return nextConfig.webpack(config, options);
    }

    return config;
  },
});
