import clsx from 'clsx';
import NextLink from 'next/link';
import type { LinkProps as NextLinkProps } from 'next/link';
import React from 'react';

export type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps> &
  NextLinkProps & {
    isRelative?: boolean;
    appearance?: 'subtle' | 'default';
    disabled?: boolean;
    children?: React.ReactNode;
  };

export const Link = (props: LinkProps) => {
  const {
    isRelative = typeof props.href !== 'string' ||
      props.href.startsWith('/') ||
      props.href.startsWith('#'),
    appearance = 'default',
    disabled = false,
    children,
    ...restProps
  } = props;

  const Component = (isRelative ? NextLink : 'a') as React.ElementType;

  return (
    <Component
      className={clsx(
        `
        select-text decoration-none decoration-1
        p0 m0 box-border
        bg-transparent  inline
        font-sans font-normal text-left
        <sm:break-all
        `,
        {
          'cursor-pointer': !disabled,
          'cursor-not-allowed': disabled,
          'hover:underline': !disabled,
          'text-NeutralForegroundDisabled': disabled,
          'text-BrandForegroundLink hover:text-BrandForegroundLinkHover active:text-BrandForegroundLinkPressed':
            !disabled && appearance === 'default',
          'text-NeutralForeground2 hover:text-NeutralForeground2Hover active:text-NeutralForeground2Pressed':
            !disabled && appearance === 'subtle',
        },
      )}
      target={isRelative ? undefined : '_blank'}
      {...restProps}
    >
      {children}
    </Component>
  );
};
