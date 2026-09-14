import rss from '@astrojs/rss';
import { BLOG_TITLE, BLOG_DESCRIPTION } from '@constants/blog';
import { getAllPosts } from '@libs/posts';

export async function GET(context) {
  const posts = await getAllPosts();
  return rss({
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      title: post.meta.title,
      description: post.meta.description,
      pubDate: post.meta.date,
      link: `/post/${post.meta.slug}`,
    })),
  });
}
