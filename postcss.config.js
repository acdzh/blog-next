const path = require('path');

module.exports = {
  plugins: {
    'postcss-nested': {},
    // 'postcss-windicss': {
    //   config: path.join(__dirname, 'windi.config.ts'),
    // },
    '@unocss/postcss': {},
    'cssnano': {
      preset: 'default',
    }
  }
};
