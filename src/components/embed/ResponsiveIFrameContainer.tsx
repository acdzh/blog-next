'use client';
import React from 'react';

export type ResponsiveIFrameContainerProps = React.HTMLAttributes<HTMLIFrameElement> & {
  ratio?: number; // width / height
  width?: number;
  height?: number;
  src: string;
};

export const ResponsiveIFrameContainer = (props: ResponsiveIFrameContainerProps) => {
  const { ratio: _ratio, width: _width, height: _height, src, ...restProps } = props;
  const width = _width || _height || 1;
  const height = _height || _width || 1;
  const ratio = _ratio || width / height || 16 / 9;

  return (
    <figure
      className="overflow-hidden relative p-0"
      style={{ paddingTop: `${100 / ratio}%` }}
      data-responsive-iframe-container=""
    >
      <iframe className="w-full h-full absolute top-0 left-0 bg-transparency" title="iframe" src={src} allowFullScreen loading="lazy" {...restProps} />
      <figcaption data-responsive-iframe-container-caption="">
        原始链接:{' '}
        <a href={src} target="_blank" rel="noopener noreferrer" data-responsive-iframe-container-link="">
          {src}
        </a>
      </figcaption>
    </figure>
  );
};
