// 'use client';
//
// /* eslint-disable @typescript-eslint/ban-ts-comment */
// import clsx from 'clsx';
// import { Highlight, Language, Prism, themes } from 'prism-react-renderer';
// import React from 'react';
//
// // @ts-ignore
// import prismCsharp from './prism-components/csharp';
// // @ts-ignore
// import prismGlsl from './prism-components/glsl';
//
// prismCsharp(Prism);
// prismGlsl(Prism);
//
// type CodeblockPropsType = {
//   children: string;
//   className: string;
// };
//
// export const Codeblock: React.FC<CodeblockPropsType> = ({ children, className = '' }) => {
//   const language = className?.replace(/language-/, '') as Language;
//   return (
//     <Highlight theme={themes.oneDark} Prism={Prism} code={children.trim()} language={language}>
//       {({ className, style, tokens, getLineProps, getTokenProps }) => (
//         <pre className={clsx(className, 'relative')} style={style}>
//           {tokens.map((line, i) => (
//             <div key={i} {...getLineProps({ line, key: i })}>
//               {line.map((token, key) => (
//                 <span key={key} {...getTokenProps({ token, key })} />
//               ))}
//             </div>
//           ))}
//           <div className="line-numbers">
//             {tokens.map((_, i) => (
//               <div className="line-numbers-rows" key={i}>
//                 <span />
//               </div>
//             ))}
//           </div>
//         </pre>
//       )}
//     </Highlight>
//   );
// };
