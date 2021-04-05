import { createOrder } from '@/api/orders';
import RequestStatus from '@/constants/RequestStatus';
import SCREEN_NAMES from '@/constants/screenNames';
import { RootState } from '@/store';
import { cleanCartAction } from '@/store/actions/cart';
import { addOrder } from '@/store/actions/orders';
import { RootStackParamList } from '@/types';
import storageService from '@/utils/storageService';
import { CreateOrderDto, PAYMENT_METHODS } from '@edenjiga/delivery-common';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import OrderScreen from './OrderScreen';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, SCREEN_NAMES.ORDER>;
  route: RouteProp<RootStackParamList, SCREEN_NAMES.ORDER>;
}

const deliveryValue = 3000;

export default ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const { user, cart } = useSelector<RootState, RootState>((state) => state);
  const { loadingStatus, data: userData } = user;
  const [paymentMethodSelected, setPaymentMethodSelected] = useState(
    PAYMENT_METHODS.CASH,
  );

  const productsWithQuanty = useMemo(() => Object.values(cart), [cart]);

  const subTotal = useMemo(() => {
    return productsWithQuanty.reduce(
      (prevValue, { quantity, product: { finalPrice } }) => {
        return prevValue + quantity * finalPrice;
      },
      0,
    );
  }, [productsWithQuanty]);

  const total = useMemo(() => subTotal + deliveryValue, [subTotal]);

  useEffect(() => {
    const goTo = SCREEN_NAMES.ORDER;
    if (loadingStatus !== RequestStatus.REQUEST_LOADED) {
      return navigation.replace(SCREEN_NAMES.LOGIN, {
        goTo,
      });
    }

    if (!userData.name || !userData.email || !userData.identification) {
      return navigation.replace(SCREEN_NAMES.USER_REQUIRED_FIELDS_FORM, {
        goTo,
      });
    }
  }, [
    loadingStatus,
    navigation,
    userData.email,
    userData.identification,
    userData.name,
  ]);

  const onCreateOrder = async () => {
    const address = storageService.getAddress();

    const products = productsWithQuanty.map(
      ({ quantity, product: { _id } }) => ({
        id: _id,
        unitsPurchased: quantity,
      }),
    );

    const data: CreateOrderDto = {
      products,
      address,
      deliveryValue,
      price: total,
      payment: {
        paymentMethod: paymentMethodSelected,
      },
    };
    try {
      const newOrder = await createOrder(data);

      dispatch(addOrder(newOrder));
      dispatch(cleanCartAction());
      return navigation.replace(SCREEN_NAMES.ROOT);
    } catch (error) {
      Alert.alert('Ups algo fallo');
    }
  };

  return (
    <OrderScreen
      deliveryValue={deliveryValue}
      onCreateOrder={onCreateOrder}
      paymentMethodSelected={paymentMethodSelected}
      productsWithQuanty={productsWithQuanty}
      setPaymentMethodSelected={setPaymentMethodSelected}
      subTotal={subTotal}
      total={total}
    />
  );
};
