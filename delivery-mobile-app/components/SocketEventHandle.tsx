import { FC, useEffect } from 'react';
import { socket } from '@/utils/socket';
import storageService from '@/utils/storageService';
import { OrderPublicFields, SOCKET_EVENTS } from '@edenjiga/delivery-common';
import { useDispatch } from 'react-redux';
import { orderUpdatedAction } from '@/store/actions/orders';
import useUserFromRedux from '@/hooks/useUserFromRedux';
const SocketEventHandle: FC = () => {
  const user = useUserFromRedux();
  const dispatch = useDispatch();
  useEffect(() => {
    if (user.data._id) {
      socket.emit('authorization', storageService.getToken());
    }
    socket.on(SOCKET_EVENTS.ORDER_UPDATED, (data: OrderPublicFields) => {
      dispatch(orderUpdatedAction(data));
    });

    socket.on('reconnect', () => {
      if (user.data._id) {
        socket.emit('authorization', storageService.getToken());
      }
    });

    return () => {
      socket.off(SOCKET_EVENTS.ORDER_UPDATED);
      socket.off('reconnect');
    };
  }, [dispatch, user]);
  return null;
};

export default SocketEventHandle;
