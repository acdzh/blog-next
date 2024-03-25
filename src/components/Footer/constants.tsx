import React from 'react';

import { BLOG_SOCIAL_USERNAMES } from '@constants/blog';

export const PLATFORMS = [
  {
    name: 'Github',
    href: `https://github.com/${BLOG_SOCIAL_USERNAMES.github}`,
    icon: {
      regular: <span className="i-simple-icons:github" />,
      filled: <span className="i-simple-icons:githubcopilot text-github" />,
    },
  },
  {
    name: 'Twitter',
    href: `https://twitter.com/${BLOG_SOCIAL_USERNAMES.twitter}`,
    icon: {
      regular: <span className="i-simple-icons:twitter" />,
      filled: <span className="i-simple-icons:x text-twitter" />,
    },
  },
  {
    name: 'Steam',
    href: `https://steamcommunity.com/id/${BLOG_SOCIAL_USERNAMES.steam}`,
    icon: {
      regular: <span className="i-simple-icons:steam" />,
      filled: <span className="i-simple-icons:steam text-steam" />,
    },
  },
  {
    name: 'Email',
    href: `mailto:${BLOG_SOCIAL_USERNAMES.mail}`,
    icon: {
      regular: <span className="i-simple-icons:gmail" />,
      filled: <span className="i-simple-icons:gmail text-mail" />,
    },
  },
  {
    name: 'RSS',
    href: '/rss.xml',
    icon: {
      regular: <span className="i-simple-icons:rss" />,
      filled: <span className="i-simple-icons:rss text-rss" />,
    },
  },
] as const;


// <Link
//   className="mr-8px"
//   href={`https://github.com/${BLOG_SOCIAL_USERNAMES.github}`}
//   target="_blank"
//   rel="noreferrer"
//   title="Github"
//   aria-label="Github"
// >
//   <Button
//     title="Github"
//     aria-label="Github"
//     appearance="subtle"
//     size="large"
//     icon={{
//       regular: <span className="i-cib:github" />,
//       filled: <span className="i-simple-icons:githubcopilotb text-github" />,
//     }}
//   />
// </Link>
// <Link
//   className="mr-8px"
//   href={`https://twitter.com/${BLOG_SOCIAL_USERNAMES.twitter}`}
//   target="_blank"
//   rel="noreferrer"
//   title="Twitter"
//   aria-label="Twitter"
// >
//   <Button
//     title="Twitter"
//     aria-label="Twitter"
//     appearance="subtle"
//     size="large"
//     icon={{
//       regular: <span className="i-simple-icons:twitter" />,
//       filled: <span className="i-simple-icons:x text-twitter" />,
//     }}
//   />
// </Link>
// <Link
//   className="mr-8px"
//   href={`https://steamcommunity.com/id/${BLOG_SOCIAL_USERNAMES.steam}`}
//   target="_blank"
//   rel="noreferrer"
//   title="Steam"
//   aria-label="Steam"
// >
//   <Button
//     title="Steam"
//     aria-label="Steam"
//     appearance="subtle"
//     size="large"
//     icon={{
//       regular: <span className="i-simple-icons:steam" />,
//       filled: <span className="i-simple-icons:steam text-steam" />,
//     }}
//   />
// </Link>
// <Link
//   className="mr-8px"
//   href={`mailto:${BLOG_SOCIAL_USERNAMES.mail}`}
//   target="_blank"
//   rel="noreferrer"
//   title="Email"
//   aria-label="Email"
// >
//   <Button
//     title="Email"
//     aria-label="Email"
//     appearance="subtle"
//     size="large"
//     icon={{
//       regular: <span className="i-simple-icons:gmail" />,
//       filled: <span className="i-simple-icons:gmail text-mail" />,
//     }}
//   />
// </Link>
// <Link
//   className="mr-8px"
//   href="/rss.xml"
//   target="_blank"
//   rel="noreferrer"
//   title="Rss"
//   aria-label="Rss"
// >
//   <Button
//     title="Rss"
//     aria-label="Rss"
//     appearance="subtle"
//     size="large"
//     icon={{
//       regular: <span className="i-simple-icons:rss" />,
//       filled: <span className="i-simple-icons:rss text-rss" />,
//     }}
//   />
// </Link>