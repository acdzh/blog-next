'use client';
import React, { useEffect, useRef } from 'react';

export type Section2Props = React.HTMLAttributes<HTMLElement> & {
  onLoad?: string;
  onEnter?: string;
};

export const Section2 = (props: Section2Props) => {
  const { onLoad, onEnter, ...restProps } = props;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    onLoad && eval(onLoad);
  }, [onLoad]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log(entry, entry.intersectionRatio);
        if (entry.intersectionRatio > 0) {
          onEnter && eval(onEnter);
        }
      },
      {
        root: null,
        rootMargin: '400px',
        threshold: 0,
      },
    );
    if (ref && ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [onEnter, ref]);
  return <section {...restProps} />;
};
