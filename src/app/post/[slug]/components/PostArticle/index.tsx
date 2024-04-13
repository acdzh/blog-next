import React from 'react';
import { formatDateTime } from 'src/utils/data';

import { mdxComponents } from './components/mdxComponents';

import { PostType } from '@libs/posts';

import './article.css';

export const PostArticle = ({ post }: { post: PostType }) => {
  const { meta, Component } = post;
  return (
    <article className="px-L py-0 sm:px-XXXL sm:py-XXL">
      <h1 className="mt-0 mb-M pt-0 pb-0 text-Base-800">{meta.title}</h1>
      <p className="mb-M text-Base-300 text-NeutralForeground3 uppercase">
        by&nbsp;
        {meta?.from ? (
          <a href={meta?.from}>{meta?.author}</a>
        ) : (
          meta?.author || meta?.author || 'UNKNOWN'
        )}
        &nbsp;·&nbsp;
        {meta.date && <>{formatDateTime(meta.date, 'yyyy-MM-dd hh:mm:ss')}</>}
      </p>
      <Component components={mdxComponents} />
    </article>
  );
};
