import { updateOrder } from '@/api/orders';
import { orderUpdatedAction } from '@/store/actions/orders';
import { OrderPublicFields, ORDER_STATUS } from '@edenjiga/delivery-common';
import React, { FC, useCallback } from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import OrderDetail from './OrderDetail';

type Props = {
  order: OrderPublicFields;
};
const OrderDetailContainer: FC<Props> = ({ order }) => {
  const dispatch = useDispatch();
  const onPressCancel = useCallback(() => {
    const cancelOrder = async () => {
      try {
        const response = await updateOrder(order._id, {
          status: ORDER_STATUS.CANCELED,
        });

        dispatch(orderUpdatedAction(response));
      } catch (err) {
        Alert.alert(
          'No se pudo cancelar la orden, si aun deseas cancelarla, comunicate con servicio al cliente',
        );
      }
    };

    Alert.alert('¿Seguro deseas cancelar esta orden?', '', [
      {
        text: 'NO',
        onPress: () => {},
        style: 'cancel',
      },
      { text: 'SI', onPress: () => cancelOrder() },
    ]);
  }, [dispatch, order._id]);

  return <OrderDetail order={order} onPressCancel={onPressCancel} />;
};
export default OrderDetailContainer;
