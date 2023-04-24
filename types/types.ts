import { ParsedUrlQuery } from 'querystring';
import { MouseEventHandler, ReactNode, RefObject } from 'react';
import type { Blocks } from '@notion-stuff/v4-types';
import { NotionTypes } from './notion';

export type Params = ParsedUrlQuery & {
  slug: string;
  category: string;
  tag: string;
  keyword: string;
};

export type DialogOptions = {
  html?: boolean;
  alert?: boolean;
  title?: string;
  description?: string;
  confirmationText?: string;
  cancellationText?: string;
  onSubmit?: MouseEventHandler<HTMLButtonElement> | undefined;
  onCancel?: MouseEventHandler<HTMLButtonElement> | undefined;
};

export type BreadcrumbProps = {
  breadList: string;
  breadListJs: string;
};

export type LayoutProps = {
  children: ReactNode;
};

export type TopProps = {
  item: RefObject<HTMLDivElement>;
};

export type FirstViewProps = TopProps & {
  pages: PageType[];
};

export type FirstProps = {
  pages: PageType[];
};

export type ContactProps = {
  item: RefObject<HTMLDivElement>;
};

export type IndexProps = {
  pages: PageType[];
};

export type SearchProps = IndexProps & {
  keyword: string;
};

export type TagProps = IndexProps & { tag: string; contents: PageType[] };

export type CategoryProps = IndexProps & {
  category: string;
  contents: PageType[];
};

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

export type BlogCardData = {
  cardData: cardData;
  blankProp: any;
};

export type cardData = {
  title: string;
  description: string;
  url: any;
  image: string;
};

export type ArticleProps = {
  page: PageType;
  blocks: NotionTypes[];
  pages: PageType[];
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
  newsSlug: { formula: { string: string } };
  published: { date: { start: string } };
  isPublic: { checkbox: boolean };
  category: { select: { name: string } };
  update: { last_edited_time: string };
  tags: { multi_select: [{ name: string }] };
  isJaCategory: { formula: { string: string } };
  description: { rich_text: RichTextType[] };
};

export type PageType = {
  id: string;
  cover: FileType | null;
  properties: PropertyType;
};
