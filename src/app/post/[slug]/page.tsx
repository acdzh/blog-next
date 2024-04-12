import React from 'react';

import { PostArticle } from './components/PostArticle';
import { PostAside } from './components/PostAside';

import { Footer } from '@components/Footer';
import { Header } from '@components/Header';
import { slugPostMap } from '@libs/posts';

export default function Post({ params }: { params: { slug: string } }) {
  const post = slugPostMap[params.slug] ?? slugPostMap[decodeURIComponent(params.slug)];
  const { meta, toc, rawMeta } = post;
  return (
    <>
      {/*TODO: SEO*/}
      <Header title={meta.title} />
      <main
        className="
          flex-1 relative
          mx-auto max-w-screen-xl px-S sm:px-L py-L sm:py-XL
          lg:flex lg:flex-row lg:justify-start lg:gap-60
        "
      >
        <div className="lg:flex-1 lg:min-w-0 mx-auto sm:shadow-Normal-2">
          <PostArticle post={post} />
        </div>
        <PostAside toc={toc} sourceFilePath={rawMeta.__raw.sourceFilePath} />
      </main>
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

export async function generateStaticParams() {
  return Object.keys(slugPostMap).map((slug) => ({ slug }));
}

export const runtime = 'edge';
