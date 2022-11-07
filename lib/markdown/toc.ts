import { Heading, Content, Parent } from 'mdast';

import { TocNode } from '../../types/markdown';

interface Options {
  depth: TocNode['depth'];
  callback: (tocNodes: TocNode[]) => void;
}
export const remarkExtractToc = (options: Options) => {
  const filterHeading = (node: Content): node is Heading =>
    node.type === 'heading' && node.depth <= options.depth;

  const findText = (node?: Content): string | undefined => {
    if (!node) return undefined;
    if (node.type === 'text') return node.value;
    if (node.type === 'link') return findText(node.children[0]);
    return undefined;
  };

  const mapHeading = (header: Heading): TocNode => {
    return {
      depth: header.depth,
      value: findText(header.children[0]) || '',
      id: (header.data?.id as string | undefined) || '',
    };
  };

  const parse = (root: Parent) => {
    const headers = root.children.filter(filterHeading).map(mapHeading);
    options.callback(headers);
  };

  return parse;
};
