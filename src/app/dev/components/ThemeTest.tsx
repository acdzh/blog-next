'use client';

import React from 'react';

import { Button } from '@components/fluent/Button';
import { setTheme, useTheme } from '@hooks/useTheme';

export const ThemeTest = () => {
  const { theme } = useTheme();
  return (
    <>
      <div suppressHydrationWarning className="text-rss">
        theme: {theme}
      </div>{' '}
      <Button onClick={() => setTheme('light')}>setLight</Button>
      <Button onClick={() => setTheme('dark')}>setDark</Button>
      <Button onClick={() => setTheme('auto')}>setAuto</Button>
    </>
  );
};
