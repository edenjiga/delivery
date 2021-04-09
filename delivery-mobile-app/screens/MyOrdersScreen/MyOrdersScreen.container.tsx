import useOrdersFromRedux from '@/hooks/useOrdersFromRedux';
import { fetchOrdersAsync } from '@/store/actions/orders';
import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MyOrdersScreen from './MyOrdersScreen';

type Props = {};

const MyOrdersScreenContainer: FC<Props> = () => {
  const dispatch = useDispatch();
  const { data } = useOrdersFromRedux();

  useEffect(() => {
    dispatch(fetchOrdersAsync.request());
  }, [dispatch]);
  return <MyOrdersScreen orders={data} />;
};

export default MyOrdersScreenContainer;
