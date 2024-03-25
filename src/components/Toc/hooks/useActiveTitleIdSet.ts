import { useEffect, useRef, useState } from 'react';

export const useActiveTitleIdSet = () => {
  const activeSectionSetRef = useRef<Set<Element>>(new Set());
  const [activeTitleIdSet, setActiveTitleIdSet] = useState<Set<string>>(new Set<string>());

  useEffect(() => {
    if (typeof document === 'undefined' || typeof IntersectionObserver === 'undefined') {
      return;
    }
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const { isIntersecting, target } of entries) {
          if (isIntersecting) {
            activeSectionSetRef.current.add(target);
          } else {
            activeSectionSetRef.current.delete(target);
          }
        }
        const newActiveTitleIdSet = new Set<string>();
        activeSectionSetRef.current.forEach((section) => {
          const h = section.querySelector('h1,h2,h3,h4,h5,h6');
          h?.id && newActiveTitleIdSet.add(h.id);
        });
        setActiveTitleIdSet(newActiveTitleIdSet);
      },
      { rootMargin: '-60px 0px 0px 0px' },
    );

    for (const section of document.querySelectorAll('section:has(h1,h2,h3,h4,h5,h6)')) {
      intersectionObserver.observe(section);
    }
    return () => intersectionObserver.disconnect();
  }, []);

  return activeTitleIdSet;
};
