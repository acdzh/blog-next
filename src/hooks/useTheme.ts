'use client';

import { useEffect, useState } from 'react';

export type ThemeFromType = 'self' | 'parent' | 'child';

export type ThemeType = 'light' | 'dark' | 'auto';

export type ThemeTypeWithOutAuto = Omit<ThemeType, 'auto'>;

declare global {
  interface Window {
    __setTheme: (theme: ThemeType, from?: ThemeFromType) => void;
    __userSettingTheme: ThemeType;
    __currentTheme: ThemeTypeWithOutAuto;
    __systemPrefersTheme: ThemeTypeWithOutAuto;
  }
}

export function useTheme(): {
  theme: ThemeTypeWithOutAuto;
} {
  const [theme, setTheme] = useState<ThemeTypeWithOutAuto>('light');

  useEffect(() => {
    setTheme(typeof window === 'undefined' ? 'light' : window.__currentTheme);
  }, []);

  useEffect(() => {
    const handler = () => {
      window.__currentTheme !== theme && setTheme(window.__currentTheme);
    };
    window.addEventListener('__theme_changed', handler);
    return () => {
      window.removeEventListener('__theme_changed', handler);
    };
  }, [theme]);
  return { theme };
}

export function setTheme(theme: ThemeType, from: ThemeFromType = 'self') {
  if (typeof window === 'undefined') return;
  if (!['light', 'dark', 'auto'].includes(theme)) {
    throw new Error(
      `Invalid theme value. Theme must be one of: 'light', 'dark', or 'auto'. You provided: ${theme}`,
    );
  }

  if (theme !== window.__userSettingTheme) {
    window.__userSettingTheme = theme;
    window.localStorage.setItem('theme', theme);
  }

  const calcTheme: ThemeTypeWithOutAuto = theme === 'auto' ? window.__systemPrefersTheme : theme;
  if (calcTheme !== window.__currentTheme) {
    window.__currentTheme = calcTheme;
    window.dispatchEvent(new Event('__theme_changed'));

    const docElement = document.documentElement;

    if (calcTheme === 'dark') {
      docElement.classList.add('dark');
      docElement.classList.remove('light');
    } else {
      docElement.classList.remove('dark');
      docElement.classList.add('light');
    }

    const metaElement = document.querySelector('meta[name="theme-color"]');
    metaElement &&
      metaElement.setAttribute('content', window.getComputedStyle(document.body).backgroundColor);
  }

  if (from === 'self' || from === 'child') {
    // 从下往上的调用，往上传递
    // 如果当前是在同源页面的 iframe 里，调用 parent 的 setTheme 方法来同步主题
    // 需要使用 try 来防止非同源场景下跨域调用失败
    if (window.self !== window.parent) {
      try {
        if (window.parent.location.origin === window.location.origin) {
          window.parent.__setTheme(theme, 'child');
        }
      } catch {}
    }
  }
  if (from === 'self' || from === 'parent') {
    // 从上往下的调用，往下传递
    // 同样找到所有同源的子 iframe 并调用其 setTheme 方法来同步主题
    for (const iframe of window.document.querySelectorAll('iframe')) {
      try {
        if (
          iframe.contentWindow &&
          iframe.contentWindow.location.origin === window.location.origin
        ) {
          iframe.contentWindow.__setTheme(theme);
        }
      } catch {}
    }
  }
}

if (typeof window !== 'undefined') {
  window.__setTheme = setTheme;
}

export function toggleTheme() {
  if (typeof window === 'undefined') return;
  setTheme(window.__currentTheme === 'dark' ? 'light' : 'dark');
}

export const htmlInjectCode = `
(function () {
  var isInSameOriginIFrame = false;
  if (window.self !== window.parent) {
    try {
      isInSameOriginIFrame = window.parent.location.origin === window.location.origin;
    } catch (e) {}
  }
  window.__userSettingTheme = (function() {
    var e;
    try {
      e = window.localStorage.getItem('theme');
    } catch (e) {}
    if ('dark' == e || 'light' == e || 'auto' == e) return e;
    return 'auto';
  })();
  window.__systemPrefersTheme = (function() {
    var t = window.matchMedia('(prefers-color-scheme: dark)');
    if ('boolean' == typeof t.matches) {
      return t.matches ? 'dark' : 'light';
    }
    return 'auto';
  })();
  window.__currentTheme = (function() {
    if (isInSameOriginIFrame) {
      if ('dark' == parent.__currentTheme || 'light' == parent.__currentTheme) {
        return parent.__currentTheme;
      }
    }
    if ('dark' == window.__userSettingTheme || 'light' == window.__userSettingTheme) return window.__userSettingTheme;
    if ('auto' == window.__userSettingTheme) return window.__systemPrefersTheme;
  })();
  if ('dark' == window.__currentTheme) {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  } else if ('light' == window.__currentTheme) {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  }
  var m = document.getElementsByName('theme-color');
  if ('undefined' != typeof m[0]) {
    m[0].setAttribute(
      'content',
      'dark' == window.__currentTheme ? '#272727' : '#ffffff'
    );
  }
})();
`;
