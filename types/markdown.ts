import { Heading } from 'mdast';

type HeadingNumber = Heading['depth'];

export interface TocNode {
  depth: HeadingNumber;
  value: string;
  id: string;
}

export interface ParsedMarkdown {
  content: string | null;
  toc: TocNode[];
}

export type MessageBoxType = 'info' | 'danger' | 'warn';
