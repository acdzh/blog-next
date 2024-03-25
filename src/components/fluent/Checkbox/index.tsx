import clsx from 'clsx';
import React from 'react';

type CheckboxProps = {
  className?: string;
  checked?: boolean;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  onChange?: (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => void;
  title?: string;
} & React.RefAttributes<HTMLSpanElement>;
export const Checkbox = (props: CheckboxProps) => {
  const { className, checked, disabled, title, label, ...otherProps } = props;
  return (
    <span
      className={clsx('fluent-checkbox inline-flex cursor-pointer align-middle', className, {
        'text-NeutralForeground3': !disabled && !checked,
        'hover:text-NeutralForeground2': !disabled && !checked,
        'text-NeutralForeground1': !disabled && checked,
        'text-NeutralForegroundDisabled': disabled,
      })}
      title={title}
      {...otherProps}
    >
      <div
        className={clsx(
          'fluent-checkbox__checkbox',
          'w-16 h-16 m-S',
          'text-12 box-border flex items-center justify-center',
          'border-solid border-1 rounded-Small', // Thin
          {
            'border-NeutralStrokeAccessible': !disabled && !checked,
            'hover:border-NeutralStrokeAccessibleHover': !disabled && !checked,

            'text-NeutralForegroundInverted': !disabled && checked,
            'bg-CompoundBrandBackground': !disabled && checked,
            'border-CompoundBrandBackground': !disabled && checked,
            'hover:text-NeutralForegroundInverted': !disabled && checked,
            'hover:CompoundBrandBackgroundHover': !disabled && checked,
            'hover:border-CompoundBrandBackgroundHover': !disabled && checked,

            'text-NeutralForegroundDisabled': disabled,
            'border-NeutralStrokeDisabled': disabled,
          },
        )}
      >
        {checked && <span className="i-fluent:checkmark-12-filled w-12 h-12 inline leading-none" />}
      </div>
      {label && (
        <span
          className="fluent-checkbox__text text-Base-300 font-sans pt-S pl-XS pr-S"
          title={title}
        >
          {label}
        </span>
      )}
    </span>
  );
};
