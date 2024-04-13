import Link from 'next/link';
import React from 'react';

import { Footer } from '@components/Footer';
import { Header } from '@components/Header';
import { Main } from '@components/Main';
import { Pagination } from '@components/fluent/Pagination';
import { allPostsGroupedByPage, ALL_POST_PAGE_COUNT } from '@libs/posts';

export function Posts({ params }: { params: { pageIndex: string } }) {
  const pageIndex = Number(params.pageIndex);
  const metas = allPostsGroupedByPage[pageIndex - 1].map((post) => post.meta);
  return (
    <>
      <Header isTocButtonShow={false} />
      <Main>
        <div>
          <div>posts: {pageIndex}</div>{' '}
          {metas.map(({ slug, title }) => (
            <div key={slug}>
              <Link href={`/post/${slug}`}>{title}</Link>
            </div>
          ))}
        </div>
        <Pagination current={pageIndex} total={ALL_POST_PAGE_COUNT} />
      </Main>
      <Footer />
    </>
  );
}

export default Posts;

export async function generateStaticParams() {
  return allPostsGroupedByPage.map((_, index) => ({ pageIndex: index + 1 + '' }));
}

export const runtime = 'edge';
