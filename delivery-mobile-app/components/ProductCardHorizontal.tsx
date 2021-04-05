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
      <View style={styles.box}>
        <View style={styles.image}>
          {!!product.Imagen && (
            <Image
              style={styles.productImage}
              resizeMode="contain"
              source={{
                uri: product.Imagen.url,
              }}
            />
          )}
        </View>
        <View style={styles.info}>
          {!!product.discount && (
            <Text style={styles.name}>{product.discount}%</Text>
          )}
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.description}>{product.description}</Text>
          {!!product.discount && (
            <Text style={styles.price}>${product.price}</Text>
          )}
        </View>
      </View>

      <View style={styles.boxInfo}>
        <Text style={styles.price}>${product.finalPrice}</Text>
        {!quantity ? (
          <TouchableOpacity style={styles.buttonAdd} onPress={addProduct}>
            <Text style={styles.addText}>+</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  addText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  box: {
    flexDirection: 'row',
  },
  boxInfo: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  buttonAdd: {
    backgroundColor: Colors.orange,
    borderRadius: 6,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: Colors.white,
    borderBottomColor: Colors.lineGray,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 100,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  count: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
  },
  counter: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    flexDirection: 'row',
  },
  decrease: {
    alignItems: 'center',
    backgroundColor: Colors.orange,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    justifyContent: 'center',
    width: 25,
  },
  description: {
    color: Colors.darkGrey,
    fontSize: 13,
    fontWeight: '300',
  },
  image: {
    borderRadius: 10,
  },
  increase: {
    alignItems: 'center',
    backgroundColor: Colors.orange,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    width: 25,
  },
  info: {
    backgroundColor: Colors.white,
    paddingVertical: 10,
    width: 150,
  },
  name: {
    color: Colors.darkGrey,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    color: Colors.black,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'right',
  },
  productImage: {
    borderRadius: 10,
    height: 100,
    width: 80,
  },
  quantity: {
    alignSelf: 'center',
    color: Colors.black,
    justifyContent: 'center',
    textAlign: 'center',
    width: 25,
  },
});

export default ProductCardHorizontal;
