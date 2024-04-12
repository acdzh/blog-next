import { visit } from 'unist-util-visit';

function rehypeCustomComponents(options = {}) {
  const { componentNames = ['iframe2'] } = options;
  return (tree) => {
    visit(tree, (n => n.type === 'mdxJsxFlowElement'), (node, index, parent) => {
      if (componentNames.includes(node.name)) {
        node.name = '_.' + node.name;
      }
    });
  }
}

export default rehypeCustomComponents;