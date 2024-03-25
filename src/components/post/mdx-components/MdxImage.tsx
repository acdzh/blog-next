'use client';

import { default as Image, ImageProps } from 'next/image';
import React from 'react';

// TODO Preview https://github.com/browniu/react-preview/blob/master/src/index.js
export const MdxImage = (props: ImageProps) => {
  const { alt = '', src, ...restProps } = props;
  if (typeof src === 'object') {
    const isSrcStaticRequire = 'default' in src;
    const blurDataURL = isSrcStaticRequire ? src.default.blurDataURL : src.blurDataURL;
    return (
      <Image alt={alt} src={src} placeholder={blurDataURL ? 'blur' : 'empty'} {...restProps} />
    );
  } else {
    return <img alt={alt} {...(restProps as React.HTMLAttributes<HTMLImageElement>)} />;
  }
};
