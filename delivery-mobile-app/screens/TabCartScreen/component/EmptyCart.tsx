import { View, Text } from '@/components/Themed';
import React, { FC } from 'react';
import { GoBackButton } from '@/components';
import Colors from '@/constants/Colors';
import { StyleSheet, Image } from 'react-native';

const EmptyCart: FC = () => (
  <View style={style.container}>
    <View style={style.head}>
      <GoBackButton title="TU CARRITO DE COMPRA" />
    </View>
    <View style={style.content}>
      <Text style={style.title}>Tu carrito está vacío</Text>
      <Text style={style.subTitle}>Aún no has agregado ningún producto a tu carrito, por favor, ve a la página de inicio para empezar a comprar</Text>
      <Image
        style={style.image}
        resizeMode="contain"
        source={require('assets/images/empty.png')}
      />
    </View>
  </View>
);
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteGrey,
  },
  head: {
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.darkGrey,
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 18,
    color: Colors.darkGrey,
    marginBottom: 30,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  image: {
    height: 200,
    width: 200,
  },
});

export default EmptyCart;
