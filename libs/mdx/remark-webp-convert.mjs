import { visit } from 'unist-util-visit'

export default function remarkWebpConvert(options = {}) {
  return (tree) => {
    visit(tree, 'image', (node) => {
      if (!/^(https?:)?\//.test(node.url)) {
        node.url =  node.url.replace(/\.(png|jpe?g)$/i, '.webp');
      }
    })
  }
}
