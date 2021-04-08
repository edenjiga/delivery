/* eslint-disable sonarjs/no-duplicate-string */
import useCartOperationForProduct from '@/hooks/useCartOperationForProduct';
import { Product } from '@edenjiga/delivery-common';
import React, { FC } from 'react';
import { StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
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
      <View style={styles.ImagenView}>
        <Image
          style={styles.productImage}
          resizeMode="contain"
          source={
            product.Imagen
              ? {
                  uri: product.Imagen.url,
                }
              : require('assets/images/vehicle.png')
          }
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
      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        <View style={styles.priceBox}>
          <Text style={styles.finalPrice}>${product.finalPrice}</Text>
          <Text style={styles.price}>${product.price}</Text>
        </View>
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
  card: {
    backgroundColor: Colors.white,
    borderRadius: 6,
    justifyContent: 'space-between',
    marginHorizontal: 5,
    width: 140,
  },
  ImagenView: {
    borderBottomColor: Colors.lineGrey,
    borderBottomWidth: 1,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    paddingVertical: 5,
    backgroundColor: Colors.backGrey,
    alignItems: 'center',
  },
  productImage: {
    borderTopLeftRadius: 6,
    height: 100,
    width: 90,
    borderTopRightRadius: 6,
  },
  info: {
    backgroundColor: Colors.white,
    marginLeft: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
    height: 80,
    justifyContent: 'space-between',
  },
  buttonAdd: {
    backgroundColor: Colors.orange,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    height: 40,
    justifyContent: 'center',
  },
  counter: {
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-between',
  },
  quantity: {
    alignSelf: 'center',
    color: Colors.black,
    fontSize: 20,
    justifyContent: 'center',
    textAlign: 'center',
    width: 60,
  },
  count: {
    color: Colors.white,
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
  },
  addText: {
    color: Colors.white,
    fontSize: 18,
    textAlign: 'center',
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
    fontSize: 14,
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
    color: Colors.red,
    fontSize: 15,
    textDecorationLine: 'line-through',
  },
  finalPrice: {
    color: Colors.green,
    fontSize: 15,
    marginRight: 10,
    fontWeight: 'bold',
  },
  priceBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    textAlign: 'center',
  },
  discountBox: {
    position: 'absolute',
    right: 2,
    top: 2,
  },
  discount: {
    height: 35,
    width: 35,
  },
  discountText: {
    position: 'absolute',
    color: Colors.white,
    fontSize: 12,
    textAlign: 'center',
    top: 8,
    right: 2,
    width: 30,
    ...Platform.select({
      ios: {
        fontSize: 10,
        top: 11,
      },
    }),
  },
});

export default ProductCardHorizontal;
