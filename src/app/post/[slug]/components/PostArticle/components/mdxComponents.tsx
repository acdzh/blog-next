import React from 'react';

import { ResponsiveIFrameContainer } from '@components/embed/ResponsiveIFrameContainer';
import { Section2 } from '@components/embed/Section2';
import { Link } from '@components/fluent/Link';
import { MdxImage } from '@components/post/mdx-components/MdxImage';
import {
  bilibili,
  codepen,
  iframe2,
  netease,
  shadertoy,
  youtube,
} from '@components/post/shortcodes';

export const mdxComponents = {
  img: MdxImage,
  a: Link,
  BiliBili: bilibili,
  CodePen: codepen,
  IFrame2: ResponsiveIFrameContainer,
  NetEase: netease,
  Pdf: (props: any) => <>{props.children}</>,
  Section2,
  ShaderToy: shadertoy,
  Youtube: youtube,
};
