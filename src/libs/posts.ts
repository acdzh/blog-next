import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { BLOG_AUTHOR, BLOG_POST_COUNT_PER_PAGE } from '@constants/blog';

export type TocItem = {
  depth: number;
  slug: string;
  text: string;
};

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
  /** File path relative to content dir, for "edit on GitHub" links */
  sourceFilePath: string;
};

export type PostType = {
  entry: CollectionEntry<'posts'>;
  meta: MetaType;
};

/**
 * Derive a URL slug from the content collection entry id.
 *
 * entry.id examples:
 *   "2020/1231 - 十分钟学会光线追踪/index.md"  -> "2020__1231_-_十分钟学会光线追踪"
 *   "2019/1009 - vhdx文件装载后无法卸载.md"     -> "2019__1009_-_vhdx文件装载后无法卸载"
 *   "about.md"                                  -> "about"
 *
 * Rules:
 *   - For index.md / index.mdx files, use the parent directory path.
 *   - Otherwise, use the file path without extension.
 *   - Replace `/` with `__` and spaces with `_`.
 */
function deriveSlug(entryId: string): string {
  let raw = entryId;
  // If the file is index.md(x), strip it and use the directory path
  if (/\/index\.mdx?$/.test(raw)) {
    raw = raw.replace(/\/index\.mdx?$/, '');
  } else {
    // Strip extension
    raw = raw.replace(/\.mdx?$/, '');
  }
  // Replace path separators with __, spaces with _
  return raw.replace(/\//g, '__').replace(/ /g, '_');
}

export async function getAllPosts(): Promise<PostType[]> {
  const entries = await getCollection('posts');

  const posts: PostType[] = entries
    .map((entry) => {
      const data = entry.data;
      const body = entry.body ?? '';
      const slug = data.slug || deriveSlug(entry.id);

      const meta: MetaType = {
        title: data.title ?? '无标题',
        description: data.description || body.slice(0, 200),
        slug,
        date: data.date ?? new Date('2020'),
        draft: !!data.draft,
        comment: data.comment !== false,
        noLicense: data.nolicense !== false,
        tags: data.tags ?? [],
        series: data.series ?? [],
        from: data.from ?? '',
        author: data.author || BLOG_AUTHOR.name,
        sourceFilePath: entry.id,
      };

      return { entry, meta };
    })
    .filter((post) => !post.meta.draft)
    .sort((a, b) => b.meta.date.getTime() - a.meta.date.getTime());

  return posts;
}

const STANDALONE_SLUGS = new Set(['about']);

export async function getListPosts(): Promise<PostType[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => !STANDALONE_SLUGS.has(post.meta.slug));
}

export function getPostsGroupedByPage(posts: PostType[]): PostType[][] {
  const pageCount = Math.ceil(posts.length / BLOG_POST_COUNT_PER_PAGE);
  return Array.from({ length: pageCount }, (_, i) =>
    posts.slice(
      i * BLOG_POST_COUNT_PER_PAGE,
      i * BLOG_POST_COUNT_PER_PAGE + BLOG_POST_COUNT_PER_PAGE,
    ),
  );
}

export async function getSlugPostMap(): Promise<Record<string, PostType>> {
  const posts = await getAllPosts();
  return posts.reduce(
    (acc, post) => {
      acc[post.meta.slug] = post;
      return acc;
    },
    {} as Record<string, PostType>,
  );
}

export async function getTagsPostMap(): Promise<Record<string, PostType[]>> {
  const posts = await getAllPosts();
  const map: Record<string, PostType[]> = {};
  posts.forEach((post) => {
    post.meta.tags.forEach((tag) => {
      if (!map[tag]) {
        map[tag] = [post];
      } else {
        map[tag].push(post);
      }
    });
  });
  return map;
}
