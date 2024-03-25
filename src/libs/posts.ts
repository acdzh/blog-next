import { BLOG_AUTHOR, BLOG_POST_COUNT_PER_PAGE } from '@constants/blog';
import type { RawPostType } from '@root/.mdx';
import { allRawPosts } from '@root/.mdx';

export type * from '@root/.mdx';

export type MetaType = {
  title: string;
  description: string;
  date: Date;
  slug: string;
  draft: boolean;
  comment: boolean;
  noLicense: boolean;
  tags: string[];
  series: string[];
  from: string;
  author: string;
};

export type PostType = RawPostType & {
  meta: MetaType;
};

export const allPosts: PostType[] = allRawPosts
  .map(({ rawMeta, toc, Component }) => {
    const meta: MetaType = {
      title: rawMeta?.title || '无标题',
      description: rawMeta?.description || rawMeta?.__content.slice(0, 200),
      slug: rawMeta?.slug || rawMeta.__raw.flattenedPath,
      date: rawMeta?.date ? new Date(rawMeta.date) : new Date('2020'),
      draft: !!rawMeta.draft,
      comment: rawMeta?.comment !== false,
      noLicense: rawMeta?.nolicense !== false,
      tags: rawMeta?.tags || [],
      series: rawMeta?.series || [],
      from: rawMeta?.from ?? '',
      author: rawMeta?.author ?? BLOG_AUTHOR.name,
    };
    return {
      meta,
      toc,
      rawMeta,
      Component,
    };
  })
  .sort((a: PostType, b: PostType) => b.meta.date.getTime() - a.meta.date.getTime());

export const allPostsGroupedByPage: PostType[][] = Array.from(
  { length: Math.ceil(allPosts.length / BLOG_POST_COUNT_PER_PAGE) },
  (_, i) =>
    allPosts.slice(
      i * BLOG_POST_COUNT_PER_PAGE,
      i * BLOG_POST_COUNT_PER_PAGE + BLOG_POST_COUNT_PER_PAGE,
    ),
);

export const slugPostMap = allPosts.reduce(
  (acc, post) => {
    acc[post.meta.slug] = post;
    return acc;
  },
  {} as Record<string, PostType>,
);

export const tagsPostMap: Record<string, PostType[]> = {};
allPosts.forEach((post) => {
  post.meta.tags.forEach((tag) => {
    if (!tagsPostMap[tag]) {
      tagsPostMap[tag] = [post];
    } else {
      tagsPostMap[tag].push(post);
    }
  });
});

export const ALL_POST_COUNT: number = allPosts.length;

export const ALL_POST_PAGE_COUNT: number = allPostsGroupedByPage.length;
