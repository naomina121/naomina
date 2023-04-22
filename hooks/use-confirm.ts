import confirmContext from '@/src/context/confirm-context';
import { DialogOptions } from '@/types/types';
import { useContext } from 'react';

const useConfirm = (): ((options: DialogOptions) => Promise<void>) => {
  const { confirm } = useContext(confirmContext);
  return confirm;
};

export default useConfirm;
