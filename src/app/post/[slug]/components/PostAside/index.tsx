'use client';
import clsx from 'clsx';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useWindowScroll } from 'react-use';

import { Toc } from '@components/Toc';
import { BLOG_GITHUB_REPO_HOST } from '@constants/blog';
import { useToggle } from '@hooks/useToggle';
import type { PostTocType } from '@libs/posts';
import { Button } from '@root/src/components/fluent/Button';

export const PostAside = ({
  toc,
  sourceFilePath,
}: {
  toc: PostTocType;
  sourceFilePath: string;
}) => {
  const [isHidden, toggleIsHidden] = useToggle(true);
  const { y } = useWindowScroll();

  useEffect(() => {
    const cb = () => toggleIsHidden();
    window && window.addEventListener('toggle-toc', cb);
    return () => {
      window && window.removeEventListener('toggle-toc', cb);
    };
  }, [toggleIsHidden]);

  return (
    <aside
      className={clsx(
        `
          lg:flex-0 lg:shrink-0 lg:w-280
          <lg:rounded-Medium
          <lg:glass <lg:shadow-Normal-4
          <lg:p-12px <lg:fixed <lg:top-64px <lg:bottom-10px
          <lg:right-L <sm:right-S
          `,
        {
          '<lg:hidden': isHidden,
        },
      )}
    >
      <div className="sticky top-86 h-[calc(100vh-146px)]">
        <Toc toc={toc} />
        <div className="h-1 mx-12 my-L bg-NeutralStroke1 rounded-Medium" />
        <div>
          <Link href={`${BLOG_GITHUB_REPO_HOST}/tree/master/content/${sourceFilePath}`}>
            <Button
              appearance="transparent"
              size="medium"
              icon={{
                regular: <span className="i-fluent:arrow-up-right-16-regular text-Base-300" />,
                filled: <span className="i-fluent:arrow-up-right-16-filled text-Base-300" />,
              }}
              iconPosition="after"
            >
              在 Github 上编辑此页
            </Button>
          </Link>
        </div>
        <div className={clsx('transition-opacity', { 'opacity-0': y < 1000 })}>
          <Button
            appearance="transparent"
            size="medium"
            icon={{
              regular: <span className="i-fluent:arrow-circle-up-16-regular text-Base-300" />,
              filled: <span className="i-fluent:arrow-circle-up-16-filled text-Base-300" />,
            }}
            iconPosition="after"
            onClick={() => window.scroll({ top: 0, behavior: 'smooth' })}
          >
            回到顶部
          </Button>
        </div>
      </div>
    </aside>
  );
};
