import { compile } from '@mdx-js/mdx';
import remarkExtractToc from '@stefanprobst/remark-extract-toc';
import remarkExtractTocMdx from '@stefanprobst/remark-extract-toc/mdx';
import crypto from 'crypto';
import grayMatter from 'gray-matter';
import npath from 'path';

import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

// import remarkMdxImages from 'remark-mdx-images';
import rehypeMdxImportMedia from 'rehype-mdx-import-media'
import remarkParse from 'remark-parse';
import remarkSlug from 'remark-slug';
import remarkSectionize from '@acdzh/remark-sectionize';

import rehypeAutolinkHeadings from 'rehype-autolink-headings';

import remarkWebpConvert from './remark-webp-convert.mjs';
import rehypeImgFigure from './rehype-img-figure.mjs';
import rehypeCustomComponents from './rehype-custom-components.mjs';

const MD_EXTENSIONS = ['.md', '.markdown', '.mdown', '.mkdn', '.mkd', '.mdwn', '.mkdown', '.ron'];
const MDX_EXTENSIONS = ['.mdx'];

const getFileFormatForMdxCompiler = (path) => {
  const extname = npath.extname(path);
  return MD_EXTENSIONS.includes(extname) ? 'md' : MDX_EXTENSIONS.includes(extname) ? 'mdx' : 'detect';
};

const isUrl = (path) => /^(https?:)?\//.test(path);
const isRelativePath = (path) => /\.\.?\//.test(path);

const getMetaCode = (content, cleanContent, name, frontMatter) => {
  const META_COVER_IMG_NAME = '__meta_cover_img__';
  const META_COVER_IMG_PLACEHOLDER = '__META_COVER_IMG_PLACEHOLDER__';
  const META_COVER_IMG_PLACEHOLDER_IN_JSON = '"__META_COVER_IMG_PLACEHOLDER__"';

  const extname = npath.extname(name);
  const contentType = MD_EXTENSIONS.includes(extname) ? 'markdown' : MDX_EXTENSIONS.includes(extname) ? 'mdx' : 'unknown';
  const sourceFileName = npath.basename(name);
  const isIndex = sourceFileName.split('.')[0] === 'index';
  const sourceFileDir = npath.dirname(name);
  const flattenedPath = (isIndex
    ? sourceFileDir
    : npath.join(
      sourceFileDir,
      sourceFileName
        .replace(/\.(mdx?|mjs)/g, '')
        .replace(/\s/g, '_'),
    )).replace(/([\\/])/g, '__'); // 计算出 slug 缺省值

  const rawMeta = {
    ...frontMatter,
    date: new Date(frontMatter?.date).toISOString(),
    __content: cleanContent,
    __id: name,
    __raw: {
      sourceFilePath: name,
      sourceFileName,
      sourceFileDir,
      contentType,
      flattenedPath,
      hasCode: cleanContent.includes('`'),
      hasMath: cleanContent.includes('$'),
    },
    __hash: crypto.createHash('md5').update(content).digest('hex'),
  };

  let metaCode = '';
  if (rawMeta.cover && !isUrl(rawMeta.cover) && isRelativePath(rawMeta.cover)) {
    metaCode += `import ${META_COVER_IMG_NAME} from '${rawMeta.cover}';\n`;
    rawMeta.cover = META_COVER_IMG_PLACEHOLDER;
  }
  metaCode += `export const meta = ${
    JSON.stringify(rawMeta, null, 2)
      .replace(META_COVER_IMG_PLACEHOLDER_IN_JSON, META_COVER_IMG_NAME)
  };`;

  return metaCode;
};

export async function mdxLoader(content, name) {
  const { content: cleanContent, data: frontMatter } = grayMatter(content);
  const metaCode = getMetaCode(content, cleanContent, name, frontMatter);
  const result = (await compile(cleanContent, {
    // jsx: true,
    format: getFileFormatForMdxCompiler(name),
    remarkPlugins: [
      // remarkMdxImages,
      process.env.NODE_ENV === 'production' && remarkWebpConvert,
      remarkMath,
      remarkParse,
      remarkGfm,
      remarkSlug,
      [remarkSectionize, { flatten: true }],
      remarkExtractToc,
      [remarkExtractTocMdx, { name: 'toc' }],
    ].filter(Boolean),
    rehypePlugins: [
      rehypeMdxImportMedia,
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
      rehypeCustomComponents,
    ],
  }));
  const mdxCode = result.value;
  const code = `${metaCode}\n${mdxCode}`;
  return [code, name.replace(/\.mdx?$/, '.mjs')];
}