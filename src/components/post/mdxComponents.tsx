import React from 'react';
import { MdxImage } from './mdx-components/MdxImage';
import {
  bilibili,
  codepen,
  iframe2,
  netease,
  pdf,
  section,
  shadertoy,
  youtube,
} from './shortcodes';

import { Link } from '@components/fluent/Link';

export const mdxComponents = {
  img: MdxImage,
  a: Link,
  Bilibili: bilibili,
  CodePen: codepen,
  IFrame2: iframe2,
  Netease: netease,
  Pdf: (props) => <>{props.children}</>,
  Section2: section,
  Shadertoy: shadertoy,
  Youtube: youtube,
};

mdxComponents['_'] = mdxComponents;
