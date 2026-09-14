/**
 * Remark plugin that auto-injects import statements for known shortcode
 * components used in MDX content, so the source .md/.mdx files don't need
 * to be modified.
 */
import { visit } from 'unist-util-visit';

const COMPONENT_MAP = {
  BiliBili: '@components/shortcodes/Bilibili.astro',
  CodePen: '@components/shortcodes/CodePen.astro',
  IFrame2: '@components/shortcodes/IFrame2.astro',
  NetEase: '@components/shortcodes/Netease.astro',
  Pdf: '@components/shortcodes/Pdf.astro',
  Section2: '@components/shortcodes/Section2.astro',
  ShaderToy: '@components/shortcodes/ShaderToy.astro',
  Youtube: '@components/shortcodes/YouTube.astro',
};

export default function remarkAutoImportShortcodes() {
  return (tree) => {
    const usedComponents = new Set();

    visit(tree, ['mdxJsxFlowElement', 'mdxJsxTextElement'], (node) => {
      if (node.name && COMPONENT_MAP[node.name]) {
        usedComponents.add(node.name);
      }
    });

    if (usedComponents.size === 0) {
      return;
    }

    const imports = [];
    for (const name of usedComponents) {
      imports.push({
        type: 'mdxjsEsm',
        value: `import ${name} from '${COMPONENT_MAP[name]}';`,
        data: {
          estree: {
            type: 'Program',
            sourceType: 'module',
            body: [
              {
                type: 'ImportDeclaration',
                specifiers: [
                  {
                    type: 'ImportDefaultSpecifier',
                    local: { type: 'Identifier', name },
                  },
                ],
                source: { type: 'Literal', value: COMPONENT_MAP[name] },
              },
            ],
          },
        },
      });
    }

    tree.children.unshift(...imports);
  };
}
