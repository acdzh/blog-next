import Link from 'next/link';
import React from 'react';

import { allPostsGroupedByPage } from '@libs/posts';
import { Header } from '@components/Header';
import { Footer } from '@components/Footer';

export default function Posts({ params }: { params: { pageIndex: string } }) {
  const pageIndex = Number(params.pageIndex);
  const metas = allPostsGroupedByPage[pageIndex - 1].map((post) => post.meta);
  return (
    <>
      <Header />
      <div>
        <div>posts: {pageIndex}</div>{' '}
        {metas.map(({ slug, title }) => (
          <div key={slug}>
            <Link href={`/post/${slug}`}>{title}</Link>
          </div>
        ))}
        {pageIndex <= 2 ? (
          <Link href="/">pre</Link>
        ) : (
          <Link href={`/posts/${pageIndex - 1}`}>pre</Link>
        )}
        {pageIndex < allPostsGroupedByPage.length && (
          <Link href={`/posts/${pageIndex + 1}`}>next</Link>
        )}
      </div>
      <Footer />
    </>
  );
}

export async function generateStaticParams() {
  return allPostsGroupedByPage.map((_, index) => ({ pageIndex: index + 1 + '' }));
}

export const runtime = 'edge';