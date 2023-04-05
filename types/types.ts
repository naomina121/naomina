import { ParsedUrlQuery } from 'querystring';
import { ReactNode, RefObject } from 'react';
import type { Blocks } from '@notion-stuff/v4-types';

export type Params = ParsedUrlQuery & {
  slug: string;
  category: string;
};

export type LayoutProps = {
  children: ReactNode;
};

export type TopProps = {
  item: RefObject<HTMLDivElement>;
};

export type IndexProps = {
  pages: PageType[];
};
export type TagProps = IndexProps & { tag: string };

export type CategoryProps = IndexProps & { category: string };

export type PageProps = {
  slug: string;
  name: string;
  author: string;
  cover: string;
  published: string;
  category: string;
  tags: string[];
  content: string;
  update: string;
};

export type CardProps = {
  page: PageType;
  index: number;
};

export type ArticleProps = {
  page: PageType;
  blocks: Blocks;
  sample: Blocks;
};

export type ContentBottomProps = {
  page: PageType;
};

export type FileType = {
  file?: { url: string };
  external?: { url: string };
};

export type AnnotationType = {
  bold: boolean;
  code: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  color: string;
};

export type RichTextType = {
  plain_text: string;
  href: string | null;
  annotations: AnnotationType;
};

export type PropertyType = {
  name: { title: RichTextType[] };
  author: { rich_text: RichTextType[] };
  slug: { rich_text: RichTextType[] };
  published: { date: { start: string } };
  isPublic: { checkbox: boolean };
  category: { select: { name: string } };
  update: { last_edited_time: string };
  tags: { multi_select: [{ name: string }] };
  isJaCategory: { formula: { string: string } };
};

export type PageType = {
  id: string;
  cover: FileType | null;
  properties: PropertyType;
};
