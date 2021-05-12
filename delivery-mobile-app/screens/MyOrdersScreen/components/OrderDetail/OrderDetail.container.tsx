import { updateOrder } from '@/api/orders';
import environment from '@/environment';
import { orderUpdatedAction } from '@/store/actions/orders';
import { OrderPublicFields, ORDER_STATUS } from '@edenjiga/delivery-common';
import React, { FC, useCallback } from 'react';
import { Alert, Linking } from 'react-native';
import { useDispatch } from 'react-redux';
import OrderDetail from './OrderDetail';

type Props = {
  order: OrderPublicFields;
};
const OrderDetailContainer: FC<Props> = ({ order }) => {
  const dispatch = useDispatch();
  const onPressActionButton = useCallback(() => {
    switch (order.status) {
      case ORDER_STATUS.CANCELED:
        // eslint-disable-next-line no-case-declarations
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
        break;

      case ORDER_STATUS.IN_PROGRESS:
        Linking.openURL(
          `whatsapp://send?text=Hola quisiera saber de la orden ${order._id}&phone=${environment.whatsappNumber}`,
        );
        break;
      default:
        return;
    }
  }, [dispatch, order._id, order.status]);

  return (
    <OrderDetail order={order} onPressActionButton={onPressActionButton} />
  );
};
export default OrderDetailContainer;
