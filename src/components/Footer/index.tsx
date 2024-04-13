import React from 'react';

import { PLATFORMS } from './constants';

import { Button } from '@components/fluent/Button';
import { BLOG_AUTHOR, BLOG_TITLE } from '@constants/blog';

export const Footer = (): React.ReactNode => {
  return (
    <footer
      className="
          w-full box-border max-w-screen-xl
          mx-auto px-48px py-24px
          <sm:text-center
          sm:flex sm:flex-row-reverse sm:justify-between
        "
    >
      <section className="<sm:mb-12px text-StrokeFocus2">
        {PLATFORMS.map(({ name, href, icon }, index) => (
          <a
            key={name}
            className={index < PLATFORMS.length - 1 ? 'mr-12' : ''}
            href={href}
            target="_blank"
            rel="noreferrer"
            title={name}
            aria-label={name}
          >
            <Button title={name} aria-label={name} appearance="subtle" size="medium" icon={icon} />
          </a>
        ))}
      </section>
      <section className="text-Base-400 leading-Base-400 text-StrokeFocus2">
        {BLOG_TITLE} © {new Date().getFullYear()} {BLOG_AUTHOR.name}
      </section>
    </footer>
  );
};
