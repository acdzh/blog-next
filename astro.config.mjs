import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import UnoCSS from 'unocss/astro';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import remarkSlug from 'remark-slug';
import remarkSectionize from '@acdzh/remark-sectionize';
import remarkAutoImportShortcodes from './src/libs/mdx/remark-auto-import-shortcodes.mjs';

import rehypeKatex from 'rehype-katex';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeImgFigure from './src/libs/mdx/rehype-img-figure.mjs';

export default defineConfig({
  site: 'https://blog.acdzh.com',
  output: 'static',
  integrations: [
    UnoCSS({ injectReset: true }),
    mdx({ extensions: ['.mdx', '.md'] }),
    sitemap(),
  ],
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [
      remarkAutoImportShortcodes,
      remarkMath,
      remarkGfm,
      remarkSlug,
      [remarkSectionize, { flatten: true }],
    ],
    rehypePlugins: [
      rehypeKatex,
      [rehypeAutolinkHeadings, { behavior: 'append' }],
      [rehypePrettyCode, {
        theme: {
          light: 'github-light',
          dark: 'one-dark-pro',
        },
        defaultLang: 'plaintext',
        keepBackground: false,
      }],
      rehypeImgFigure,
    ],
  },
});
