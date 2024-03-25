import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss';

import { fluentTheme } from './libs/fluent/theme';

const normalSpacingMap = new Array(1024).fill(0).reduce((acc, _, i) => {
  acc[i + 1] = `${i + 1}px`;
  return acc;
}, {});

export default defineConfig({
  content: {
    filesystem: ['**/*.{html,js,ts,jsx,tsx,vue,svelte,astro}'],
    // exclude: ['.git/**/*', 'node_modules/**/*'],
  },
  shortcuts: {
    'px-loose': 'px-16px md:px-32px lg:px-64px xl:px-32px',
    'py-loose': 'py-8px sm:py-16px md:py-32px lg:py-32px',
    glass: 'backdrop-filter backdrop-blur-xl backdrop-saturate-[1.8]',
  },
  theme: {
    colors: {
      // theme: colors.pink,
      github: '#0366d6',
      twitter: '#1d9bf0',
      steam: '#60b6e7',
      mail: '#f9c513',
      rss: '#f26522',
      ...fluentTheme.colors,
    },
    boxShadow: fluentTheme.boxShadow,
    borderRadius: fluentTheme.borderRadius,
    fontSize: {
      ...normalSpacingMap,
      ...fluentTheme.fontSize,
    },
    lineHeight: {
      ...normalSpacingMap,
      ...fluentTheme.lineHeight,
    },
    fontFamily: {
      sans: `"Helvetica Neue", Helvetica, "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif`,
      serif: `"Georgia", "serif"`,
      mono: `"Fira Code VF", "Fira Code", Monaco, Menlo, Consolas, "Droid Sans Mono", "Courier New", monospace`,
    },
    borderWidth: {
      ...normalSpacingMap,
      ...fluentTheme.borderWidth,
    },
    width: normalSpacingMap,
    minWidth: normalSpacingMap,
    maxWidth: normalSpacingMap,
    height: normalSpacingMap,
    minHeight: normalSpacingMap,
    maxHeight: normalSpacingMap,
    spacing: {
      ...normalSpacingMap,
      ...fluentTheme.spacing,
    },
    duration: fluentTheme.duration,
    easing: fluentTheme.easing,
    transitionProperty: {
      border: 'border',
    },
  },
  presets: [presetUno(), presetIcons(), presetAttributify()],
});
