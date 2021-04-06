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
        <View>
          {!!product.Imagen && (
            <View style={styles.image}>
              <Image
                style={styles.productImage}
                resizeMode="contain"
                /*source={{
                uri: product.Imagen.url,
              }}*/
                source={require('assets/images/vehicle.png')}
              />
              <View style={styles.discountBox}>
                <Image
                  style={styles.discount}
                  resizeMode="contain"
                  source={require('assets/images/discount.png')}
                />
                <Text style={styles.discountText}>-{product.discount}%</Text>
              </View>
            </View>
          )}
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </View>

      <View style={styles.boxInfo}>
        <View>
          <Text style={styles.normalPrice}>${product.price}</Text>
          <Text style={styles.discountPrice}>${product.finalPrice}</Text>
          <Text style={styles.specialPrice}>${product.price}</Text>
        </View>
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
  card: {
    backgroundColor: Colors.white,
    borderBottomColor: Colors.lineGrey,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  box: {
    flexDirection: 'row',
  },
  image: {
    borderRadius: 6,
    backgroundColor: Colors.backGrey,
    width: 120,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    height: 100,
    width: 90,
  },
  discountBox: {
    position: 'absolute',
    right: 2,
    top: 2,
  },
  discount: {
    width: 35,
    height: 35,
  },
  info: {
    backgroundColor: Colors.white,
    padding: 5,
    width: 140,
  },
  discountText: {
    color: Colors.white,
    position: 'absolute',
    fontSize: 12,
    right: 5,
    top: 8,
  },
  addText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  name: {
    color: Colors.black,
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  boxInfo: {
    paddingRight: 5,
    paddingTop: 5,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  normalPrice: {
    color: Colors.black,
    fontSize: 15,
    fontWeight: 'bold',
  },
  specialPrice: {
    color: Colors.red,
    fontSize: 15,
    textDecorationLine: 'line-through',
  },
  discountPrice: {
    color: Colors.green,
    fontSize: 15,
    fontWeight: 'bold',
  },
  buttonAdd: {
    backgroundColor: Colors.orange,
    borderRadius: 6,
    width: 35,
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
    fontSize: 14,
    fontWeight: '300',
  },
  increase: {
    alignItems: 'center',
    backgroundColor: Colors.orange,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    width: 25,
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
