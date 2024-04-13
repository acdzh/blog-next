import Link from 'next/link';
import React from 'react';
import { allPostsGroupedByPage } from '@libs/posts';
import { Header } from '@components/Header';
import { Footer } from '@components/Footer';
import { Posts }  from './posts/[pageIndex]/page';

// // This file allows you to provide custom React components
// // to be used in MDX files. You can import and use any
// // React component you want, including inline styles,
// // components from other libraries, and more.
//
// export function useMDXComponents(components: MDXComponents): MDXComponents {
//   return {
//     // Allows customizing built-in components, e.g. to add styling.
//     h1: ({ children }) => <h1 style={{ fontSize: '100px' }}>{children}</h1>,
//     img: (props) => (
//       <Image
//         sizes="100vw"
//         style={{ width: '100%', height: 'auto' }}
//         {...props}
//       />
//     ),
//     ...components,
//   }
// }

// const mdxComponents: MDXComponents = {
//   img: (props) => {
//     return <Image src={props.src as any} alt={props.alt as any} placeholder="blur" />;
//   }
// };

// function PostCard(post: Post) {
//   const MDXContent = useMDXComponent(post.body.code)
//   return (
//     <div className="mb-8">
//       <h2 className="mb-1 text-xl">
//         <Link href={post.url} className="text-blue-700 hover:text-blue-900 dark:text-blue-400">
//           {post.title}
//         </Link>
//       </h2>
//       <time dateTime={post.date} className="mb-2 block text-xs text-gray-600">
//         {format(parseISO(post.date), 'LLLL d, yyyy')}
//       </time>
//       <MDXContent components={mdxComponents} />
//       {/* <div className="text-sm [&>*]:mb-3 [&>*:last-child]:mb-0" dangerouslySetInnerHTML={{ __html: post.body.html }} /> */}
//     </div>
//   )
// }

export default function Home() {
  return <Posts params={{ pageIndex: '1' }} />
  // const metas = allPostsGroupedByPage[0].map((post) => post.meta);
  // return (
  //   <>
  //     <Header />
  //     <div className="mx-auto max-w-xl py-8">
  //       {metas.map(({ slug, title }) => (
  //         <div key={slug}>
  //           <Link href={`/post/${slug}`}>{title}</Link>
  //         </div>
  //       ))}
  //       <Link href="/posts/2">next</Link>
  //     </div>
  //     <Footer />
  //   </>
  // );
}
