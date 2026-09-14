import { visit } from 'unist-util-visit';
import { h } from 'hastscript';

function rehypeImgFigure() {
  return (tree) => {
    visit(tree, (n => n.name === 'img'), (node, index, parent) => {
      // 图片上添加 title
      let title;
      if (node.type === 'mdxJsxTextElement') {
        const properties = Object.fromEntries(node.attributes.map(({ name, value }) => [name, value]));
        title = properties.title || properties.alt || '';
        node.attributes.push({ type: 'mdxJsxAttribute', name: 'data-title', value: '' });
      } else if (node.type === 'element') {
        title =  node.properties.title || node.properties.alt || '';
        node.properties['data-title'] = title;
      }

      // 如果不是段落内图片，退出
      if (parent?.tagName !== 'p') {
        return;
      }
      // 如果是行内图片，不包装 figure 了，也退出
      if (parent.children.length > 1 && parent.children.some(child => child.name !== 'img')) {
        // 包装在 span 里
        parent.children[index] = h('span', { 'data-rehype-img-figure': '' }, [
          node,
          title && h('span', { 'data-rehype-img-figure-caption': '' }, title),
        ].filter(Boolean));
      } else {
        // 包装在 figure 里
        parent.children[index] = h('figure', { 'data-rehype-img-figure': '' }, [
          node,
          title && h('figcaption', { 'data-rehype-img-figure-caption': '' }, title),
        ].filter(Boolean));
      }
    });
    visit(tree, (n => n.tagName === 'p'), (node, index, parent) => {
      if (node.children.length === 1) {
        const child = node.children[0];
        if (child.tagName === 'figure' && child.properties['dataRehypeImgFigure'] !== undefined) {
          parent.children[index] = child;
        }
      }
    });
  }
}

export default rehypeImgFigure;