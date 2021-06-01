/* eslint-disable react-native/no-raw-text */
import React, { FC } from 'react';
import { Text } from '@/components/Themed';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { ProductWithQuantity } from '@/types';
import { Address, PAYMENT_METHODS } from '@edenjiga/delivery-common';
import { GoBackButton } from '@/components';
import NumberFormatToCop from '@/components/NumberFormatToCop';
import { PaymentMethods } from './components';
import Colors from '@/constants/Colors';

type Props = {
  address: Address | null;
  deliveryValue: number;
  onCreateOrder(): void;
  paymentMethodSelected: PAYMENT_METHODS;
  productsWithQuanty: ProductWithQuantity[];
  subTotal: number;
  setPaymentMethodSelected(a: PAYMENT_METHODS): void;
  totalDiscount: number;
  total: number;
};

const OrderScreen: FC<Props> = ({
  address,
  deliveryValue,
  onCreateOrder,
  productsWithQuanty,
  subTotal,
  setPaymentMethodSelected,
  paymentMethodSelected,
  total,
  totalDiscount,
}) => {
  return (
    <View style={style.container}>
      <SafeAreaView>
        <View>
          <View style={style.header}>
            <GoBackButton title="RESUMEN DE LA ORDEN:" />
          </View>

          <View style={style.deliveryBox}>
            <View style={style.delivery}>
              <Text style={style.title}>Entregar domicilio a:</Text>
              <View style={style.headerLocation}>
                <Image
                  style={style.marker}
                  resizeMode="contain"
                  source={require('assets/images/marker.png')}
                />
                <Text style={style.textNom}>{address?.nomenclature}</Text>
              </View>
              <Text style={style.text}>{address?.name}</Text>
            </View>
          </View>

          <View style={style.deliveryBox}>
            <Text style={style.titleDetails}>DETALLES DEL PAGO:</Text>
            <View style={style.product}>
              <Text style={style.info}>Numero de products:</Text>
              <Text style={style.info}>{productsWithQuanty.length}</Text>
            </View>
            <View style={style.product}>
              <Text style={style.info}>SubTotal:</Text>
              <NumberFormatToCop style={style.info} number={subTotal} />
            </View>
            <View style={style.product}>
              <Text style={style.info}>Descuento Aplicado:</Text>
              <NumberFormatToCop
                style={style.infoDiscount}
                number={totalDiscount}
              />
            </View>
            <View style={style.product}>
              <Text style={style.info}>Envio:</Text>
              <NumberFormatToCop style={style.info} number={deliveryValue} />
            </View>
            <View style={style.product}>
              <Text style={style.infoPay}>Total a pagar:</Text>
              <NumberFormatToCop style={style.infoTotal} number={total} />
            </View>
          </View>

          <View style={style.deliveryBox}>
            <Text style={style.titleDetails}>MÉTODO DEL PAGO:</Text>
            <View style={style.pay}>
              <PaymentMethods
                paymentMethodSelected={paymentMethodSelected}
                onValueChange={(itemValue) =>
                  setPaymentMethodSelected(itemValue)
                }
              />
            </View>
          </View>

          <View style={style.orderContent}>
            <View style={style.buttonContainer}>
              <TouchableOpacity style={style.button} onPress={onCreateOrder}>
                <Text style={style.btnText}>Crear orden</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  delivery: {
    backgroundColor: Colors.whiteGrey,
    borderRadius: 6,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  deliveryBox: {
    backgroundColor: Colors.white,
    borderBottomColor: Colors.lineGrey,
    borderBottomWidth: 1,
    padding: 20,
  },
  header: {
    backgroundColor: Colors.white,
    borderBottomColor: Colors.lineGrey,
    borderBottomWidth: 1,
    paddingVertical: 5,
  },

  headerLocation: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  marker: {
    height: 18,
    marginRight: 5,
    width: 18,
  },
  title: {
    color: Colors.black,
    fontFamily: 'latoBold',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  titleDetails: {
    color: Colors.black,
    fontSize: 15,
    fontFamily: 'latoBold',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  pay: {
    paddingVertical: 10,
  },
  textNom: {
    color: Colors.darkGrey,
  },
  text: {
    color: Colors.darkGrey,
    marginLeft: 24,
    marginTop: 2,
  },
  product: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  info: {
    color: Colors.darkGrey,
    fontSize: 15,
    marginBottom: 5,
  },
  infoPay: {
    color: Colors.darkGrey,
    fontSize: 15,
    fontFamily: 'latoBold',
    marginTop: 10,
  },
  infoDiscount: {
    color: Colors.red,
  },
  infoTotal: {
    color: Colors.green,
    fontSize: 16,
    fontFamily: 'latoBold',
    marginTop: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: Colors.lightGreen,
    borderRadius: 6,
    color: Colors.white,
    paddingHorizontal: 60,
    paddingVertical: 10,
  },
  btnText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: 'latoBold',
  },
  orderContent: {
    top: 40,
  },
});

export default OrderScreen;
