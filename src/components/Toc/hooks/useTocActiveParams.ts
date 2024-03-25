import { useMemo } from 'react';

import { useActiveTitleIdSet } from './useActiveTitleIdSet';

import type { PostTocType } from '@libs/posts';

export const useTocActiveParams = (flattenToc: PostTocType) => {
  const activeTitleIdSet = useActiveTitleIdSet();
  return useMemo(() => {
    const len = flattenToc.length;
    const size = activeTitleIdSet.size;
    const tocActiveIndexMap = new Array(len).fill(false);
    let tocLastActiveIndex = 0;
    let tocFirstActiveIndex = 0;
    let tocActiveCount = 0;
    if (size) {
      for (let i = len - 1; i >= 0; i--) {
        const id = flattenToc[i].id;
        const active = id && activeTitleIdSet.has(id);
        if (active) {
          tocActiveIndexMap[i] = true;
          tocActiveCount++;
          i > tocLastActiveIndex && (tocLastActiveIndex = i);
        } else {
          if (i + 1 < flattenToc.length && tocActiveIndexMap[i + 1]) {
            tocFirstActiveIndex = i + 1;
            break;
          }
        }
      }
    }
    return {
      tocActiveCount,
      tocActiveIndexMap,
      tocLastActiveIndex,
      tocFirstActiveIndex,
    };
  }, [flattenToc, activeTitleIdSet]);
};
