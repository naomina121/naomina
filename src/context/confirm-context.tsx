import { DialogOptions } from '@/types/types';
import { createContext } from 'react';

export default createContext(
  {} as {
    fc: { confirm: (options: DialogOptions) => Promise<any> };
    cmp: {
      reject: (reason?: any) => void;
      resolve: (value: boolean | PromiseLike<boolean>) => void;
    };
  }
);
