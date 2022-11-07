import { Root } from 'mdast';
import { Transformer } from 'unified';
import { visit } from 'unist-util-visit';

export const remarkCodeTitle = (): Transformer<Root, Root> => {
  return (tree: Root) => {
    visit(tree, (node) => {
      if (node.type === 'code' && node.lang) {
        const re = /.*:(.*)/;
        const match = node.lang.match(re);
        if (match) {
          node.lang = node.lang.replace(re, '');
          node.data = {
            hProperties: {
              title: match[1],
            },
          };
        }
      }
    });
  };
};
