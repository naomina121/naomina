import { ReactNode, RefObject } from 'react';

export type LayoutProps = {
  children: ReactNode;
};

export type TopProps = {
  item: RefObject<HTMLDivElement>;
};

export type CardProps = {
  page: {
    slug: string;
    name: string;
    author: string;
    cover: string;
    published: string;
    category: string;
    tags: string[];
    content: string;
  };
  index: number;
};
