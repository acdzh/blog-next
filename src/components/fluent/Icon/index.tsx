// 'use client';

// export * from './icons';

// import type { FluentIcon } from '@fluentui/react-icons/lib/utils/createFluentIcon';
// import type { FluentIconProps } from '@fluentui/react-icons/lib/utils/FluentIconsProps.types';
// import clsx from 'clsx';
// import * as React from 'react';

// export const BundleIcon: React.FC<
//   {
//     FilledIcon?: FluentIcon;
//     RegularIcon?: FluentIcon;
//   } & FluentIconProps
// > = ({ FilledIcon, RegularIcon, ...props }) => {
//   const { className, primaryFill = 'currentColor', filled, ...rest } = props;
//   return (
//     <>
//       {FilledIcon && (
//         <FilledIcon
//           {...rest}
//           className={clsx(
//             'hidden',
//             filled && 'inline',
//             'fluent-compound-icon__filled-icon',
//             className,
//           )}
//           fill={primaryFill}
//         />
//       )}
//       {RegularIcon && (
//         <RegularIcon
//           {...rest}
//           className={clsx(
//             'hidden',
//             !filled && 'inline',
//             'fluent-compound-icon__regular-icon',
//             className,
//           )}
//           fill={primaryFill}
//         />
//       )}
//     </>
//   );
// };
