import clsx from 'clsx';
import React from 'react';

import styles from './index.module.css';

type TocButtonProps = {
  title: string;
  depth?: number; // absolute depth of the heading
  active?: boolean;
  onClick?: () => void;
};

export const TocButton = (props: TocButtonProps) => {
  const { title = '', depth = 1, active = false, onClick = () => {} } = props;
  return (
    <button
      className={clsx(styles.tocButton, {
        'text-NeutralForeground2': !active,
        'text-NeutralForeground2Hover': active,
        'font-semibold': active,
      })}
      style={{ marginLeft: `${depth - 1}em` }}
      onClick={onClick}
      title={title}
    >
      {title}
    </button>
  );
};

export const TOC_BUTTON_HEIGHT = 28;
