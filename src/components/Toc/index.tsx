'use client';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';

import { TOC_BUTTON_HEIGHT, TocButton } from './components/TocButton';
import { useFlattenToc } from './hooks/useFlattenToc';
import { useFlattenTocMinDepth } from './hooks/useFlattenTocMinDepth';
import { useTocActiveParams } from './hooks/useTocActiveParams';

import type { PostTocType } from '@root/.mdx';

export const Toc = ({ toc = [] }: { toc: PostTocType }) => {
  const router = useRouter();
  const flattenToc = useFlattenToc(toc);
  const tocMinDepth = useFlattenTocMinDepth(flattenToc);
  const { tocFirstActiveIndex, tocLastActiveIndex, tocActiveCount, tocActiveIndexMap } =
    useTocActiveParams(flattenToc);

  const jumpToId = useCallback(
    (id?: string) => {
      if (!id) {
        return;
      }
      const element = document.getElementById(id);
      if (element) {
        window.scroll({
          top: element?.offsetTop - 60,
          behavior: 'smooth',
        });
      } else {
        router.push('#' + id);
      }
    },
    [router],
  );

  return (
    <nav suppressHydrationWarning className="relative">
      <div
        className="pl-20 text-Base-400 font-sans font-semibold bg-none hover:cursor-pointer"
        onClick={() => {
          window.scroll({ top: 0, behavior: 'smooth' });
        }}
      >
        目录
      </div>
      <ul className="mt-L pl-8 relative max-h-[70vh] overflow-y-auto overscroll-y-contain">
        <div
          className="absolute z-2 w-3 bg-BrandStroke1 rounded-Medium"
          style={{
            opacity: tocActiveCount > 0 ? 1 : 0,
            height: `${(tocLastActiveIndex - tocFirstActiveIndex + 1) * TOC_BUTTON_HEIGHT}px`,
            top: `${tocFirstActiveIndex * TOC_BUTTON_HEIGHT}px`,
            left: '0',
            transition: 'all 0.2s ease',
          }}
        />
        {flattenToc.map(({ value, depth, id }, index) => (
          <li className="relative list-none" key={value}>
            <TocButton
              title={value}
              depth={depth - tocMinDepth + 1}
              active={tocActiveIndexMap[index]}
              onClick={() => jumpToId(id)}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};
