import { MutableRefObject, ReactNode, RefObject } from 'react';

export type LayoutProps = {
  children: ReactNode;
};

export type TopProps = {
  item: RefObject<HTMLDivElement>;
};
