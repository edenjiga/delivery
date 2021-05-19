import useCartOperationForProduct from '@/hooks/useCartOperationForProduct';
import { Product } from '@edenjiga/delivery-common';
import React, { FC } from 'react';
import { StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { Text, View } from '../Themed';
import Colors from '@/constants/Colors';
import { RootStackParamList } from '@/types';
import SCREEN_NAMES from '@/constants/screenNames';
import NumberFormatToCop from '../NumberFormatToCop';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type Props = {
  product: Product;
};

const ProductCardHorizontal: FC<Props> = ({ product }) => {
  const { addProduct, decreaseProduct, quantity } = useCartOperationForProduct(
    product,
  );

  const navigation = useNavigation<
    StackNavigationProp<RootStackParamList, SCREEN_NAMES.ROOT>
  >();
  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.box}
        onPress={() =>
          navigation.navigate(SCREEN_NAMES.PRODUCT_DETAIL, {
            product,
          })
        }
      >
        <View>
          <View style={styles.image}>
            <Image
              style={styles.productImage}
              resizeMode="contain"
              source={
                product.Imagen
                  ? {
                      uri: product.Imagen.url,
                    }
                  : require('assets/images/kangaroo_empty.png')
              }
            />
            {!!product.discount && (
              <View style={styles.discountBox}>
                <Image
                  style={styles.discount}
                  resizeMode="contain"
                  source={require('assets/images/discount.png')}
                />
                <Text style={styles.discountText}>-{product.discount}%</Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.boxInfo}>
        <View>
          {!product.discount ? (
            <NumberFormatToCop
              style={styles.normalPrice}
              number={product.price}
            />
          ) : (
            <View>
              <NumberFormatToCop
                style={styles.discountPrice}
                number={product.finalPrice}
              />
              <NumberFormatToCop
                style={styles.specialPrice}
                number={product.price}
              />
            </View>
          )}
        </View>
        {!quantity ? (
          <TouchableOpacity
            style={styles.buttonAdd}
            onPress={() => addProduct()}
          >
            <Text style={styles.addText}>+</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.counter}>
            <TouchableOpacity style={styles.decrease} onPress={decreaseProduct}>
              <Text style={styles.count}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity
              style={styles.increase}
              onPress={() => addProduct()}
            >
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
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 2,
  },
  box: {
    flexDirection: 'row',
    width: '80%',
  },
  boxInfo: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingTop: 5,
    right: 2,
    minWidth: 75,
  },
  buttonAdd: {
    backgroundColor: Colors.orange,
    borderRadius: 6,
    width: 35,
  },
  card: {
    backgroundColor: Colors.white,
    borderBottomColor: Colors.lineGrey,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  count: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 2,
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
  },
  discount: {
    height: 35,
    width: 35,
  },
  discountBox: {
    position: 'absolute',
    right: 2,
    top: 2,
  },
  discountPrice: {
    color: Colors.green,
    fontSize: 15,
    fontWeight: 'bold',
  },
  discountText: {
    color: Colors.white,
    fontSize: 12,
    position: 'absolute',
    right: 2,
    textAlign: 'center',
    top: 8,
    width: 30,
    ...Platform.select({
      ios: {
        fontSize: 10,
        top: 11,
      },
    }),
  },
  image: {
    alignItems: 'center',
    backgroundColor: Colors.backGrey,
    borderRadius: 6,
    height: 100,
    justifyContent: 'center',
    width: 120,
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
    padding: 5,
    width: '55%',
  },
  name: {
    color: Colors.black,
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  normalPrice: {
    color: Colors.black,
    fontSize: 15,
    fontWeight: 'bold',
  },
  productImage: {
    height: 100,
    width: 90,
  },
  quantity: {
    alignSelf: 'center',
    color: Colors.black,
    justifyContent: 'center',
    textAlign: 'center',
    width: 25,
  },
  specialPrice: {
    color: Colors.red,
    fontSize: 15,
    textDecorationLine: 'line-through',
    textAlign: 'right',
  },
});

export default ProductCardHorizontal;
