'use client';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { useToggle, useWindowScroll } from 'react-use';

import { Button } from '../fluent/Button';

import { BLOG_TITLE } from '@constants/blog';
import { toggleTheme, useTheme } from '@hooks/useTheme';

// import { ExpandNavItem } from './ExpandNavItem';

// const isSSR = typeof window === 'undefined';

export type HeaderPropsType = {
  title?: string;
  isTocButtonShow?: boolean;
};

export const Header = ({ title, isTocButtonShow = false }: HeaderPropsType): React.ReactNode => {
  const { theme } = useTheme();
  const [isExpandNavShow, toggleIsExpandNavShow] = useToggle(false);

  const { y } = useWindowScroll();

  return (
    <header
      className={clsx(
        'sticky top-0 mx-L <sm:mx-S z-100 glass bg-header rounded-b-Medium transition-shadow',
        {
          'shadow-Normal-4': y > 10 || isExpandNavShow,
        },
      )}
    >
      <div
        className="
          flex justify-between
          h-54 max-w-screen-xl
          mx-auto px-S sm:px-L
        "
      >
        {/* link items */}
        <div className="<sm:hidden flex flex-row justify-center items-center">
          <Link href="/">
            <Button
              appearance="subtle"
              size="large"
              icon={{
                regular: <span className="i-fluent:home-24-regular" />,
                filled: <span className="i-fluent:home-24-filled" />,
              }}
            >
              首页
            </Button>
          </Link>
          <Button
            appearance="subtle"
            size="large"
            // to="/series"
            icon={{
              regular: <span className="i-fluent:bookmark-multiple-24-regular" />,
              filled: <span className="i-fluent:bookmark-multiple-24-filled" />,
            }}
          >
            系列
          </Button>
          <Button
            appearance="subtle"
            size="large"
            // to="/tags"
            icon={{
              regular: <span className="i-fluent:tag-multiple-24-regular" />,
              filled: <span className="i-fluent:tag-multiple-24-filled" />,
            }}
          >
            标签
          </Button>
          <Button
            appearance="subtle"
            size="large"
            // to="/about"
            icon={{
              regular: <span className="i-fluent:person-24-regular" />,
              filled: <span className="i-fluent:person-24-filled" />,
            }}
          >
            关于
          </Button>
          <Button
            appearance="subtle"
            size="large"
            // to="/rss"
            icon={{
              regular: <span className="i-fluent:rss-24-regular" />,
              filled: <span className="i-fluent:rss-24-filled" />,
            }}
          >
            RSS
          </Button>
        </div>

        {/* left buttons and title */}
        <div className="sm:hidden mr-12 flex flex-row justify-center items-center overflow-hidden">
          <Button
            className="mr-S"
            aria-label="打开关闭菜单"
            title="打开关闭菜单"
            appearance="subtle"
            size="large"
            icon={
              isExpandNavShow
                ? {
                    regular: <span className="i-fluent:chevron-down-24-regular" />,
                    filled: <span className="i-fluent:chevron-down-24-filled" />,
                  }
                : {
                    regular: <span className="i-fluent:navigation-24-regular" />,
                    filled: <span className="i-fluent:navigation-24-filled" />,
                  }
            }
            onClick={toggleIsExpandNavShow}
          />
          <div className="leading-54 text-Base-500 truncate">{title || BLOG_TITLE}</div>
        </div>

        {/* right buttons */}
        <div className="relative flex flex-row justify-center items-center">
          <Button
            title="回到顶部"
            aria-label="回到顶部"
            appearance="subtle"
            size="large"
            className={clsx('mr-S', {
              'hidden!': y < 1000,
            })}
            icon={{
              regular: <span className="i-fluent:arrow-circle-up-24-regular" />,
              filled: <span className="i-fluent:arrow-circle-up-24-filled" />,
            }}
            onClick={() => window.scroll({ top: 0, behavior: 'smooth' })}
          />
          {isTocButtonShow && (
            <Button
              title="显示或隐藏目录"
              aria-label="显示或隐藏目录"
              appearance="subtle"
              size="large"
              className="lg:hidden! mr-S"
              icon={{
                regular: <span className="i-fluent:text-bullet-list-24-regular" />,
                filled: <span className="i-fluent:text-bullet-list-24-filled" />,
              }}
              onClick={() => {
                window && window.dispatchEvent(new Event('toggle-toc'));
              }}
            />
          )}
          <Button
            title="切换主题"
            aria-label="切换主题"
            appearance="subtle"
            size="large"
            icon={
              theme === 'dark'
                ? {
                    regular: <span className="i-fluent:weather-sunny-24-regular" />,
                    filled: <span className="i-fluent:weather-sunny-24-filled" />,
                  }
                : {
                    regular: <span className="i-fluent:weather-moon-24-regular" />,
                    filled: <span className="i-fluent:weather-moon-24-filled" />,
                  }
            }
            onClick={() => toggleTheme()}
          />
        </div>
      </div>

      {isExpandNavShow && (
        <nav className="sm:hidden">
          <div
            className="
              w-full max-w-screen-xl
              mx-auto px-loose
            "
          >
            <div className="mb-XXS">
              <Link href="/">
                <Button
                  appearance="transparent"
                  size="large"
                  icon={{
                    regular: <span className="i-fluent:home-24-regular" />,
                    filled: <span className="i-fluent:home-24-filled" />,
                  }}
                >
                  {BLOG_TITLE}
                </Button>
              </Link>
            </div>
            <div className="mb-XXS">
              <Button
                appearance="transparent"
                size="large"
                // to="/series"
                icon={{
                  regular: <span className="i-fluent:bookmark-multiple-24-regular" />,
                  filled: <span className="i-fluent:bookmark-multiple-24-filled" />,
                }}
              >
                系列
              </Button>
            </div>
            <div className="mb-XXS">
              <Button
                appearance="transparent"
                size="large"
                // to="/tags"
                icon={{
                  regular: <span className="i-fluent:tag-multiple-24-regular" />,
                  filled: <span className="i-fluent:tag-multiple-24-filled" />,
                }}
              >
                标签
              </Button>
            </div>
            <div className="mb-XXS">
              <Button
                appearance="transparent"
                size="large"
                // to="/about"
                icon={{
                  regular: <span className="i-fluent:person-24-regular" />,
                  filled: <span className="i-fluent:person-24-filled" />,
                }}
              >
                关于
              </Button>
            </div>
            <div className="mb-XXS">
              <Button
                appearance="transparent"
                size="large"
                // to="/rss"
                icon={{
                  regular: <span className="i-fluent:rss-24-regular" />,
                  filled: <span className="i-fluent:rss-24-filled" />,
                }}
              >
                RSS
              </Button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};
