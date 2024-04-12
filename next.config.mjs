// next.config.js
// const UnoCSS = require('@unocss/webpack').default
// import { withContentlayer } from 'next-contentlayer'
// import { withMdxImage} from './plugins/withMdxImage.mjs'
import { withNextMdx } from './libs/mdx/withNextMdx.mjs';
// const { withMdx } = require('./plugin/withMdx.mjs');
// import { withUnoCss } from './libs/withUnoCss.mjs';

// import WindiCSSWebpackPlugin from 'windicss-webpack-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  reactStrictMode: true,
  swcMinify: true,
  eslint: { ignoreDuringBuilds: true },
  images: { unoptimized: true },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    legacyBrowsers: false,
    browsersListForSwc: true,
  }
  // webpack(config) {
  //
  // },
};

// export default withMdxImage(withContentlayer(nextConfig));
// module.exports = withMdx(nextConfig);
export default nextConfig;
// export default withNextMdx(nextConfig);