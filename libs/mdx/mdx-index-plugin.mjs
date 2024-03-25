import crypto from 'crypto';
import fs from 'fs';
import npath from 'path';

const dtsFileContent = `
import type { MDXComponents } from 'mdx/types';
import type { Toc, TocEntry } from '@stefanprobst/remark-extract-toc';

export type PostTocType = Toc;
export type PostTocEntryType = TocEntry;

export type PostRawMetaType = {
  title?: string;
  description?: string;
  date?: string;
  slug?: string;
  draft?: boolean;
  comment?: boolean;
  tags?: string[];
  series?: string[];
  nolicense?: boolean;
  from?: string;
  author?: string;

  __content: string;
  __id: string;
  __raw: {
    sourceFilePath: string;
    sourceFileName: string;
    sourceFileDir: string;
    contentType: string;
    flattenedPath: string;
  }
  __hash: string;
};

export type RawPostType = {
  rawMeta: PostRawMetaType;
  toc: PostTocType;
  Component: MDXComponents;
};

export declare const allRawPosts: RawPostType[];`;

export class MdxIndexPlugin {
  constructor(options = {}) {
    this.options = options;
    this.compiler = null;
    this.mdxFilePathSet = new Set();
  }

  apply(compiler) {
    this.compiler = compiler;
    const { output } = this.compiler.options;

    compiler.hooks['after-load'].tap('MdxIndexPlugin', (name) => {
      if (!/\.mjs$/g.test(name)) {
        return;
      }
      this.mdxFilePathSet.add(npath.join(output, name));
    });

    compiler.hooks.done.tap('ModuleGraphPlugin', () => {
      const existingMdxFilePaths = [...this.mdxFilePathSet].filter(path => fs.existsSync(path));
      this.mdxFilePathSet = new Set(existingMdxFilePaths);
      const rootPath = npath.join(output, '..');
      const existingMdxFileRelativePaths = existingMdxFilePaths.map(path => {
        const relativePath = npath.relative(rootPath, path);
        const md5 = crypto.createHash('md5').update(relativePath).digest('hex').slice(0, 6);
        return [relativePath, md5];
      });
      const code = `${existingMdxFileRelativePaths.map(([relativePath, md5]) => `
import { default as Component_${md5}, meta as rawMeta_${md5}, toc as toc_${md5} } from './${relativePath}';
const post_${md5} = { rawMeta: rawMeta_${md5}, toc: toc_${md5}, Component: Component_${md5} };`).join('')}
export const allRawPosts = [\n  ${existingMdxFileRelativePaths.map(([_, md5]) => `post_${md5}`).join(',\n  ')}\n];`;
      this.compiler.emitFile('../index.mjs', code);
    });
    this.compiler.emitFile('../index.d.ts', dtsFileContent);
  }
}