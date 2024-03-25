'use client';

import { FluentProvider, webDarkTheme, webLightTheme } from '@fluentui/react-components';
import React from 'react';

import { useTheme } from '@hooks/useTheme';

export const FluentProviderFactory: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme();
  return (
    <>
      <div suppressHydrationWarning>{theme}</div>
      <FluentProvider theme={theme === 'light' ? webLightTheme : webDarkTheme}>
      {children}
      </FluentProvider>
    </>
  );
};
