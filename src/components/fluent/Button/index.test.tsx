import React from 'react';

import { Button, ButtonProps } from '../Button';

const icon = <span className="i-fluent:weather-sunny-32-regular" />;
const bundleIcon = {
  regular: <span className="i-fluent:weather-sunny-32-regular" />,
  filled: <span className="i-fluent:weather-sunny-32-filled" />,
};

export const ButtonGallery = () => (
  <>
    {[false, true]
      .map((disabled) =>
        [false, true]
          .map((showText) =>
            ['small', 'medium', 'large']
              .map((size) =>
                [false, true]
                  .map((showIcon) =>
                    ['before', 'after'].map((iconPosition) => {
                      if (!showIcon && !showText) return null;
                      if ((!showText || !showIcon) && iconPosition !== 'after') return null;
                      return (
                        <div className="mb-2" key={`${disabled}${size}${showIcon}${showText}`}>
                          {['primary', 'secondary', 'outline', 'subtle', 'transparent'].map(
                            (appearance) => (
                              <Button
                                key={`${disabled}${size}${showIcon}${showText}${appearance}`}
                                className="mr-4"
                                appearance={appearance as ButtonProps['appearance']}
                                size={size as ButtonProps['size']}
                                icon={
                                  showIcon
                                    ? appearance === 'subtle' || appearance === 'transparent'
                                      ? bundleIcon
                                      : icon
                                    : undefined
                                }
                                iconPosition={iconPosition as ButtonProps['iconPosition']}
                                disabled={disabled}
                              >
                                {showText
                                  ? appearance === 'primary'
                                    ? `${size} ${appearance}`
                                    : appearance
                                  : ''}
                              </Button>
                            ),
                          )}
                        </div>
                      );
                    }),
                  )
                  .flat(),
              )
              .flat(),
          )
          .flat(),
      )
      .flat()}
  </>
);
