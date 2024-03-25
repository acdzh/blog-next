import { useMemo } from 'react';

import type { PostTocType } from '@libs/posts';

const MAX_DEPTH = 8;

const flattenToc = (toc: PostTocType, relativeDepth = 1): PostTocType =>
  toc
    .map(({ value, depth, id, children }) => [
      { value, depth, id },
      ...(children && relativeDepth < MAX_DEPTH ? flattenToc(children, relativeDepth + 1) : []),
    ])
    .flat(2);

export const useFlattenToc = (toc: PostTocType) => useMemo(() => flattenToc(toc), [toc]);
