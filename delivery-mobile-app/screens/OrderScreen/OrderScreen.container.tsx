import { createOrder } from '@/api/orders';
import RequestStatus from '@/constants/RequestStatus';
import SCREEN_NAMES from '@/constants/screenNames';
import useAddress from '@/hooks/useAddress';
import useModal from '@/hooks/useModal';
import useSettings from '@/hooks/useSettings';
import { RootState } from '@/store';
import { cleanCartAction } from '@/store/actions/cart';
import { addOrder } from '@/store/actions/orders';
import { RootStackParamList } from '@/types';
import { HandleErrorMessage } from '@/utils/errorMessages';
import { CreateOrderDto, PAYMENT_METHODS } from '@edenjiga/delivery-common';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrderScreen from './OrderScreen';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, SCREEN_NAMES.ORDER>;
  route: RouteProp<RootStackParamList, SCREEN_NAMES.ORDER>;
}

export default ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const { address } = useAddress();
  const { showModal } = useModal();
  const { deliveryValue: deliveryValues } = useSettings();

  const { user, cart } = useSelector<RootState, RootState>((state) => state);
  const { loadingStatus, data: userData } = user;
  const [paymentMethodSelected, setPaymentMethodSelected] = useState(
    PAYMENT_METHODS.CASH,
  );
  const productsWithQuanty = useMemo(() => Object.values(cart), [cart]);
  const deliveryValue = productsWithQuanty.some(
    ({ product }) => product.isReturnable,
  )
    ? deliveryValues!.doubleDeliveryValue
    : deliveryValues!.simpleDeliveryValue;

  const { subTotal, totalDiscount } = useMemo(() => {
    return productsWithQuanty.reduce(
      (prevValue, { quantity, product: { finalPrice, discountValue } }) => ({
        subTotal: prevValue.subTotal + quantity * finalPrice,
        totalDiscount: prevValue.totalDiscount + quantity * discountValue,
      }),

      {
        subTotal: 0,
        totalDiscount: 0,
      },
    );
  }, [productsWithQuanty]);

  const total = useMemo(() => subTotal + deliveryValue, [
    deliveryValue,
    subTotal,
  ]);

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

    //Check if the app have a address in memory
    if (!address.name) {
      if (!userData.address?.length) {
        return navigation.replace(SCREEN_NAMES.ADD_ADDRESS, {
          goTo,
        });
      } else {
        return navigation.replace(SCREEN_NAMES.SELECT_ADDRESS, {
          goTo,
        });
      }
    }
  }, [
    address,
    loadingStatus,
    navigation,
    userData.address?.length,
    userData.email,
    userData.identification,
    userData.name,
  ]);

  const onCreateOrder = async () => {
    const products = productsWithQuanty.map(
      ({ quantity, product: { _id } }) => ({
        id: _id,
        unitsPurchased: quantity,
      }),
    );

    const data: CreateOrderDto = {
      products,
      address: address,
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

      showModal({ text: 'Su orden ha sido creada', icon: 'success' });
      return navigation.replace(SCREEN_NAMES.ROOT);
    } catch (error) {
      const message = HandleErrorMessage(error.message);
      showModal({ text: message });
    }
  };

  return (
    <OrderScreen
      address={address}
      deliveryValue={deliveryValue}
      onCreateOrder={onCreateOrder}
      paymentMethodSelected={paymentMethodSelected}
      productsWithQuanty={productsWithQuanty}
      setPaymentMethodSelected={setPaymentMethodSelected}
      subTotal={subTotal}
      totalDiscount={totalDiscount}
      total={total}
    />
  );
};
