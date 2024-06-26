import crypto from 'crypto';
import { MdxIndexPlugin } from './mdx-index-plugin.mjs';
import { mdxLoader } from './mdx-loader.mjs';
import { MdxLoggerPlugin } from './mdx-logger-plugin.mjs';
import { MdxWebpConvertPlugin } from './mdx-webp-convert-plugin.mjs';

const config = {
  input: 'content', // input directory
  output: '.mdx/generated', // output directory
  module: {
    rules: [
      {
        test: /\.mdx?$/,
        use: [mdxLoader],
      },
    ],
  },
  plugins: [
    new MdxIndexPlugin(),
    new MdxLoggerPlugin({
      whitelist: ['.md', '.mdx', '.mjs'],
    }),
    process.env.NODE_ENV === 'production' && new MdxWebpConvertPlugin(),
  ].filter(Boolean),
};

export default config;