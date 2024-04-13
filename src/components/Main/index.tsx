import React from 'react';

export type MainPropsType = {
  children?: React.ReactNode;
};

export const Main = ({ children }: MainPropsType): React.ReactNode => {
  return (
    <main
      className="
          flex-1 relative
          mx-auto max-w-screen-xl px-S sm:px-L py-L sm:py-XL
          lg:flex lg:flex-row lg:justify-start lg:gap-60
        "
    >
      {children}
    </main>
  );
};
