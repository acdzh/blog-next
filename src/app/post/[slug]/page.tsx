import React from 'react';

import { PostArticle } from './components/PostArticle';
import { PostAside } from './components/PostAside';

import { Footer } from '@components/Footer';
import { Header } from '@components/Header';
import { Main } from '@components/Main';
import { slugPostMap } from '@libs/posts';

export function Post({ params }: { params: { slug: string } }) {
  const post = slugPostMap[params.slug] ?? slugPostMap[decodeURIComponent(params.slug)];
  if (!post) {
    return `can not find ${params.slug}`;
  }
  const { meta, toc, rawMeta } = post;
  return (
    <>
      {/*TODO: SEO*/}
      <Header title={meta.title} isTocButtonShow={true} />
      <Main>
        <div className="lg:flex-1 lg:min-w-0 mx-auto sm:shadow-Normal-2">
          <PostArticle post={post} />
        </div>
        <PostAside toc={toc} sourceFilePath={rawMeta.__raw.sourceFilePath} />
      </Main>
      <Footer />
      {rawMeta.__raw.hasCode && (
        <link
          href="https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/firacode/6.2.0/fira_code.min.css"
          type="text/css"
          rel="stylesheet"
        />
      )}
      {rawMeta.__raw.hasMath && (
        <link
          href="https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/KaTeX/0.15.2/katex.min.css"
          type="text/css"
          rel="stylesheet"
        />
      )}
    </>
  );
}

export default Post;

export async function generateStaticParams() {
  return Object.keys(slugPostMap).map((slug) => ({ slug }));
}

export const runtime = 'edge';
