import { RootState } from '@/store';
import { IOrdersState } from '@/types';
import { useSelector } from 'react-redux';

const useOrdersFromRedux = (): IOrdersState => {
  return useSelector<RootState, IOrdersState>((state) => state.orders);
};
export default useOrdersFromRedux;
