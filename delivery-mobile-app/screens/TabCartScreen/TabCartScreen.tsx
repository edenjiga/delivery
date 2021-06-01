import React, { FC } from 'react';
import { Text, View } from '@/components/Themed';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import { ProductWithQuantity } from '@/types';
import { ProductCardHorizontal } from '@/components';
import Colors from '@/constants/Colors';
import NumberFormatToCop from '@/components/NumberFormatToCop';
import { EmptyCart } from './component';

type Props = {
  onGoToPay(): void;
  productWithQuantity: ProductWithQuantity[];
  total: number;
};

const TabCartScreen: FC<Props> = ({
  onGoToPay,
  productWithQuantity = [],
  total,
}) =>
  productWithQuantity.length ? (
    <View style={styles.container}>
      <ScrollView>
        <View>
          {productWithQuantity.map(({ product }) => (
            <ProductCardHorizontal product={product} key={product._id} />
          ))}
        </View>
      </ScrollView>

      <View style={styles.order}>
        <Text style={styles.subtotal}>
          Subtotal: <NumberFormatToCop style={styles.price} number={total} />
        </Text>
        {!!productWithQuantity.length && (
          <View style={styles.btnBox}>
            <TouchableOpacity style={styles.button} onPress={onGoToPay}>
              <Text style={styles.buttonText}>Ir a pagar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  ) : (
    <EmptyCart />
  );
const styles = StyleSheet.create({
  btnBox: {
    alignItems: 'center',
    marginVertical: 15,
  },
  button: {
    alignItems: 'center',
    backgroundColor: Colors.orange,
    borderRadius: 6,
    height: 40,
    justifyContent: 'center',
    width: 160,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 20,
  },
  container: {
    flex: 1,
  },
  order: {
    backgroundColor: Colors.white,
    bottom: 0,
    left: 0,
    right: 0,
  },
  price: {
    color: Colors.green,
    fontSize: 17,
    fontFamily: 'latoBold',
  },
  subtotal: {
    borderBottomColor: Colors.lineGrey,
    borderBottomWidth: 1,
    borderTopColor: Colors.lineGrey,
    borderTopWidth: 1,
    fontSize: 18,
    paddingVertical: 10,
    textAlign: 'center',
  },
});

export default TabCartScreen;
