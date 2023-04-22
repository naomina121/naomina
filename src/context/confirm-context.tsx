import { DialogOptions } from '@/types/types';
import { createContext } from 'react';

export default createContext(
  {} as {
    confirm: (options: DialogOptions) => Promise<void>;
  }
);
