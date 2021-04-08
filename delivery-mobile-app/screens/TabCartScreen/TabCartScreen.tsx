import React, { FC } from 'react';
import { Text, View } from '@/components/Themed';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { ProductWithQuantity } from '@/types';
import { ProductCardHorizontal } from '@/components';
import Colors from '@/constants/Colors';

type Props = {
  onGoToPay(): void;
  productWithQuantity: ProductWithQuantity[];
  total: number;
};

const TabCartScreen: FC<Props> = ({
  onGoToPay,
  productWithQuantity = [],
  total,
}) => (
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
        Subtotal: <Text style={styles.price}>${total}</Text>
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
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  order: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.white,
  },
  subtotal: {
    borderTopWidth: 1,
    borderTopColor: Colors.lineGrey,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lineGrey,
    textAlign: 'center',
    paddingVertical: 10,
    fontSize: 18,
  },
  price: {
    fontSize: 17,
    color: Colors.green,
    fontWeight: 'bold',
  },
  btnBox: {
    alignItems: 'center',
    marginVertical: 15,
  },
  button: {
    backgroundColor: Colors.orange,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    borderRadius: 6,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 20,
  },
});

export default TabCartScreen;
