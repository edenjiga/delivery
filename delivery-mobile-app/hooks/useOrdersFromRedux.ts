import { RootState } from '@/store';
import { OrdersState } from '@/types';
import { useSelector } from 'react-redux';

const useOrdersFromRedux = (): OrdersState => {
  return useSelector<RootState, OrdersState>((state) => state.orders);
};
export default useOrdersFromRedux;
