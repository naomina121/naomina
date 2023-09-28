import confirmContext from '@/src/context/confirm-context';
import { useContext } from 'react';

const useConfirm = () => {
  const { fc, cmp } = useContext(confirmContext);
  return { fc: fc, cmp: cmp };
};
export default useConfirm;
