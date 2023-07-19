import type { Heading, Parent } from 'mdast';
import type { Plugin, Transformer } from 'unified';
import type { Node } from 'unist';
import { visit } from 'unist-util-visit';

interface RawTocItem {
  id: string;
  text: string;
  depth: number;
}

interface TocItem {
  id: string;
  text: string;
  depth: number;
  children: TocItem[];
}

export type Toc = TocItem[];

interface Option {
  minDepth?: number;
  maxDepth?: number;
  cb?: (toc: Toc) => void;
}

const buildToc = (rawToc: RawTocItem[]): Toc => {
  // parse rawToc to toc
  const toc: Toc = [];
  const stack: TocItem[] = [];
  rawToc.forEach((item) => {
    const { depth, id, text } = item;
    const tocItem: TocItem = {
      children: [],
      depth,
      id,
      text,
    };
    if (stack.length === 0) {
      toc.push(tocItem);
      stack.push(tocItem);
      return;
    }
    if (stack[stack.length - 1].depth < depth) {
      stack[stack.length - 1].children.push(tocItem);
      stack.push(tocItem);
      return;
    }
    while (stack.length > 0 && stack[stack.length - 1].depth >= depth) {
      stack.pop();
    }
    if (stack.length === 0) {
      toc.push(tocItem);
      stack.push(tocItem);
      return;
    }
    stack[stack.length - 1].children.push(tocItem);
    stack.push(tocItem);
  });

  return toc;
};

export const remarkExtractToc: Plugin<[Option?]> = (option = {}): Transformer => {
  const { cb, maxDepth = 3, minDepth = 1 } = option;
  const toc: RawTocItem[] = [];
  return async (tree: Node) => {
    const visitor = (node: Heading, _index: number, parent?: Parent) => {
      if (!parent) return;

      const { children, depth } = node;

      if (depth < minDepth) return;
      if (depth > maxDepth) return;

      children.forEach((child) => {
        if (child.type === 'text') {
          const id = child.value;

          toc.push({
            depth,
            id,
            text: child.value,
          });
        }
      });
    };
    visit(tree, 'heading', visitor);
    cb?.(buildToc(toc));
  };
};
