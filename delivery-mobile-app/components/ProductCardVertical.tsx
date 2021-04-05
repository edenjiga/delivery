/* eslint-disable sonarjs/no-duplicate-string */
import useCartOperationForProduct from '@/hooks/useCartOperationForProduct';
import { Product } from '@edenjiga/delivery-common';
import React, { FC } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, View } from './Themed';
import Colors from '@/constants/Colors';

type Props = {
  product: Product;
};

const ProductCardHorizontal: FC<Props> = ({ product }) => {
  const { addProduct, decreaseProduct, quantity } = useCartOperationForProduct(
    product,
  );

  return (
    <View style={styles.card}>
      {!!product.Imagen && (
        <View style={styles.ImagenView}>
          <Image
            style={styles.productImage}
            resizeMode="contain"
            source={{
              uri: product.Imagen.url,
            }}
          />
        </View>
      )}
      <View style={styles.info}>
        {!!product.discount && (
          <Text style={styles.name}>{product.discount}%</Text>
        )}
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>${product.finalPrice}</Text>
        {!!product.discount && (
          <Text style={styles.price}>${product.price}</Text>
        )}
      </View>
      {!quantity ? (
        <TouchableOpacity style={styles.buttonAdd} onPress={addProduct}>
          <Text style={styles.addText}>Agregar</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.counter}>
          <TouchableOpacity style={styles.decrease} onPress={decreaseProduct}>
            <Text style={styles.count}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity style={styles.increase} onPress={addProduct}>
            <Text style={styles.count}>+</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  ImagenView: {
    borderBottomColor: Colors.lineGray,
    borderBottomWidth: 1,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  addText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonAdd: {
    backgroundColor: Colors.orange,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    height: 40,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 6,
    justifyContent: 'space-between',
    marginHorizontal: 5,
    minHeight: 120,
    width: 140,
  },
  count: {
    color: Colors.white,
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
  },
  counter: {
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-between',
  },
  info: {
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
    marginLeft: 5,
    minHeight: 90,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  productImage: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    height: 100,
    width: '100%',
  },
  quantity: {
    alignSelf: 'center',
    color: Colors.black,
    fontSize: 20,
    justifyContent: 'center',
    textAlign: 'center',
    width: 60,
  },
  increase: {
    alignItems: 'center',
    backgroundColor: Colors.orange,
    borderBottomRightRadius: 6,
    justifyContent: 'center',
    width: 40,
  },
  decrease: {
    alignItems: 'center',
    backgroundColor: Colors.orange,
    borderBottomLeftRadius: 6,
    justifyContent: 'center',
    width: 40,
  },
  name: {
    color: Colors.darkGrey,
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    color: Colors.darkGrey,
    fontSize: 12,
    fontWeight: '300',
    marginBottom: 10,
  },
  price: {
    color: Colors.black,
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default ProductCardHorizontal;
