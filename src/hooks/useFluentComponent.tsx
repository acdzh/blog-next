'use client';
import { FluentProvider, webDarkTheme, webLightTheme } from '@fluentui/react-components';

import { useTheme } from './useTheme';

export const useFluentComponent = (Component, props) => {
  const { theme } = useTheme();
  return (
    <FluentProvider theme={theme === 'light' ? webLightTheme : webDarkTheme}>
      <Component {...props} />
    </FluentProvider>
  );
};
