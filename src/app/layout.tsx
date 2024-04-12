import type { Viewport } from 'next';
import React from 'react';

import { BLOG_DESCRIPTION, BLOG_TITLE } from '@constants/blog';
import { htmlInjectCode } from '@hooks/useTheme';

import '@unocss/reset/normalize.css';
import '@styles/globals.css';
import '@styles/fluent.css';

export const metadata = {
  title: BLOG_TITLE,
  description: BLOG_DESCRIPTION,
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
};

// <meta charset="utf-8"><meta http-equiv="x-ua-compatible" content="ie=edge"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="zh-CN"
      className={typeof window === 'undefined' ? 'light' : (window.__currentTheme as string)}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: htmlInjectCode }} />
        <title>{BLOG_TITLE}</title>
      </head>

      <body
        className="
        w-full min-h-screen m-0 p-0
        relative overscroll-none
        flex flex-col justify-stretch
        bg-NeutralBackground1 text-StrokeFocus2 font-sans
        "
      >
        {children}
      </body>
    </html>
  );
}
