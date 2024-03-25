import { useMemo } from 'react';

import type { PostTocType } from '@libs/posts';

const getFlattenTocMinDepth = (flattenToc: PostTocType): number => {
  let min = 100;
  for (const item of flattenToc) {
    if (item.depth < min) {
      min = item.depth;
    }
    if (min === 1) {
      break; // 最小了，不用再查了
    }
  }
  return min === 100 ? 1 : min;
};

export const useFlattenTocMinDepth = (flattenToc: PostTocType) =>
  useMemo(() => getFlattenTocMinDepth(flattenToc), [flattenToc]);
