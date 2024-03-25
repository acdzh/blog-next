import clsx from 'clsx';
import React from 'react';

import './styles/icon.css';
import './styles/icon.bundle.css';
import './styles/root.appearance.css';
import './styles/root.base.css';
import './styles/root.shape.css';
import './styles/root.size.css';
import './styles/root.disabled.css';
import './styles/icon.disabled.css';

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonAppearance = 'secondary' | 'primary' | 'outline' | 'subtle' | 'transparent';
export type ButtonShape = 'rounded' | 'circular' | 'square';
export type ButtonIconPosition = 'before' | 'after';

export type ButtonProps = {
  className?: React.ButtonHTMLAttributes<HTMLButtonElement>['className'];
  icon?:
    | React.ReactNode
    | {
        filled: React.ReactNode;
        regular: React.ReactNode;
      };
  appearance?: ButtonAppearance;
  disabled?: boolean;
  iconPosition?: ButtonIconPosition;
  shape?: ButtonShape;
  size?: ButtonSize;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: ButtonProps) => {
  const {
    className,
    children,
    icon,
    appearance = 'secondary',
    disabled = false,
    iconPosition = 'before',
    shape = 'rounded',
    size = 'medium',
    ...otherProps
  } = props;

  const isOnlyIcon = icon && !children;
  // @ts-ignore
  const isBundleIcon = icon && icon.regular && icon.filled;
  const isBothIconAndText = icon && children;
  const isSmall = size === 'small';
  const isLargeOrMedium = size === 'large' || size === 'medium';

  const computedRootClassName = clsx(
    'fluent-button',
    `fluent-button--appearance-${appearance}`,
    `fluent-button--shape-${shape}`,
    `fluent-button--size-${size}`,
    {
      'fluent-button--disabled': disabled,
      'fluent-button--icon': icon,
      'fluent-button--only-icon': isOnlyIcon,
    },

    className,
  );

  const computedIconClassName = (type?: string) =>
    clsx('fluent-button__icon', type && `fluent-button__icon--${type}`, {
      'mr-4px': isBothIconAndText && iconPosition === 'before' && isSmall,
      'mr-6px': isBothIconAndText && iconPosition === 'before' && isLargeOrMedium,
      'ml-4px': isBothIconAndText && iconPosition === 'after' && isSmall,
      'ml-6px': isBothIconAndText && iconPosition === 'after' && isLargeOrMedium,
    });

  const iconComponent = isBundleIcon ? (
    <>
      {/* @ts-ignore*/}
      <span className={computedIconClassName('regular')}>{icon.regular}</span>
      {/* @ts-ignore*/}
      <span className={computedIconClassName('filled')}>{icon.filled}</span>
    </>
  ) : (
    // @ts-ignore
    <span className={computedIconClassName()}>{icon}</span>
  );

  return (
    <button className={computedRootClassName} disabled={disabled} {...otherProps}>
      {icon && iconPosition === 'before' && iconComponent}
      {children}
      {icon && iconPosition === 'after' && iconComponent}
    </button>
  );
};

Button.displayName = 'Button';
