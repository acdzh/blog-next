// import { useTheme } from 'gatsby-plugin-use-dark-mode';
import React from 'react';

const Netease: React.FC<{
  id: string;
  type?: 1 | 2 | 3;
  autoPlay?: boolean;
  showInfo?: boolean;
}> = ({ id, type = 2, autoPlay = false, showInfo = true }) => {
  // const { theme } = useTheme();
  const theme: string = 'light'; // TODO
  return (
    <p>
      <iframe
        className="mx-auto w-full max-w-640px h-89px"
        marginWidth={0}
        marginHeight={0}
        src={`//music.163.com/outchain/player?type=${type}&id=${id}&auto=${
          autoPlay ? '1' : '0'
        }&height=66`}
        title="网易云音乐"
      />
      {showInfo && (
        <div className="text-center text-10px" style={{ marginTop: theme === 'dark' ? 8 : 0 }}>
          如因版权问题无法加载, 请跳转至
          <a
            className="text-theme"
            href={`https://music.163.com/${type === 3 ? 'program' : 'song'}?id=${id}`}
            target="_blank"
            rel="noreferrer"
          >
            网易云
          </a>
          播放.
        </div>
      )}
    </p>
  );
};

export const netease = Netease;
