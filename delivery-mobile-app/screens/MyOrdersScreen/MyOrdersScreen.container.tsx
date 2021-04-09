import RequestStatus from '@/constants/RequestStatus';
import useOrdersFromRedux from '@/hooks/useOrdersFromRedux';
import { fetchOrdersAsync } from '@/store/actions/orders';
import React, { FC, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import MyOrdersScreen from './MyOrdersScreen';

const MyOrdersScreenContainer: FC = () => {
  const dispatch = useDispatch();
  const { data, fetchOrderStatus } = useOrdersFromRedux();

  useEffect(() => {
    if (fetchOrderStatus !== RequestStatus.REQUEST_LOADED) {
      dispatch(fetchOrdersAsync.request());
    }
  }, [dispatch, fetchOrderStatus]);

  const orderSortedByCreatedAt = useMemo(
    () =>
      Object.values(data).sort((orderA, orderB) =>
        orderA.createdAt <= orderB.createdAt ? 1 : -1,
      ),
    [data],
  );

  return <MyOrdersScreen orders={orderSortedByCreatedAt} />;
};

export default MyOrdersScreenContainer;
