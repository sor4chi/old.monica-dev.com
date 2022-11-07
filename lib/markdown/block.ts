import { Root, BlockContent } from 'mdast';
import { Transformer } from 'unified';
import { visit } from 'unist-util-visit';

import { MessageBoxType } from '#/types/markdown';

export const remarkClassifyDirective = (): Transformer<Root, Root> => {
  return (tree: Root) => {
    visit(tree, (node) => {
      if (
        node.type === 'textDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'containerDirective'
      ) {
        if (node.name !== 'message') return;

        const data = node.data || (node.data = {});

        let boxType: MessageBoxType = 'info';

        if (node.attributes?.warn !== undefined) boxType = 'warn';
        if (node.attributes?.danger !== undefined) boxType = 'danger';

        data.hName = node.name;

        node.children = [
          {
            type: 'containerDirective',
            name: 'box',
            data: {
              hName: 'div',
              hProperties: {
                className: boxType,
              },
            },
            children: node.children as BlockContent[],
          },
        ];
      }
    });
  };
};
