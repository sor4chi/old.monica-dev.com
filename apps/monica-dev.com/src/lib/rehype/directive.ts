import type { Root } from 'mdast';
// import 'remark-directive';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { z } from 'zod';

const schema = z.object({
  children: z.array(z.object({ value: z.string() })).min(1),
});

const remarkCustomDirectives: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type === 'textDirective' || node.type === 'leafDirective' || node.type === 'containerDirective') {
        if (node.name !== 'tweet') return;

        const data = node.data || (node.data = {});
        const validatedNode = schema.safeParse(node);
        if (!validatedNode.success) return;
        const id = validatedNode.data.children[0].value;

        data.hName = 'div';
        data.hProperties = {
          className: ['tweet-embed'],
        };
        data.hChildren = [
          {
            children: [
              {
                properties: {
                  href: `https://twitter.com/i/status/${id}`,
                },
                tagName: 'a',
                type: 'element',
              },
            ],
            properties: {
              className: ['twitter-tweet'],
            },
            tagName: 'blockquote',
            type: 'element',
          },
        ];
      }
    });
  };
};

export default remarkCustomDirectives;
