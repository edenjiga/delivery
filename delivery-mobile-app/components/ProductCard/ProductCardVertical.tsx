import useCartOperationForProduct from '@/hooks/useCartOperationForProduct';
import { Product } from '@edenjiga/delivery-common';
import React, { FC } from 'react';
import { StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { Text, View } from '../Themed';
import Colors from '@/constants/Colors';
import NumberFormatToCop from '../NumberFormatToCop';
import SCREEN_NAMES from '@/constants/screenNames';
import { RootStackParamList } from '@/types';
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
        onPress={() =>
          navigation.push(SCREEN_NAMES.PRODUCT_DETAIL, {
            product,
          })
        }
      >
        <View style={styles.ImagenView}>
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
        <View style={styles.info}>
          <Text style={styles.name}>{product.name}</Text>
          {product.discount ? (
            <View style={styles.priceBox}>
              <NumberFormatToCop
                style={styles.finalPrice}
                number={product.finalPrice}
              />
              <NumberFormatToCop style={styles.price} number={product.price} />
            </View>
          ) : (
            <NumberFormatToCop
              style={styles.priceWithNotDiscount}
              number={product.finalPrice}
            />
          )}
        </View>
      </TouchableOpacity>

      {!quantity ? (
        <TouchableOpacity style={styles.buttonAdd} onPress={() => addProduct()}>
          <Text style={styles.addText}>Agregar</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.counter}>
          <TouchableOpacity
            style={styles.decrease}
            onPress={() => decreaseProduct()}
          >
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
  );
};

const styles = StyleSheet.create({
  ImagenView: {
    alignItems: 'center',
    backgroundColor: Colors.backGrey,
    borderBottomColor: Colors.lineGrey,
    borderBottomWidth: 1,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    paddingVertical: 5,
  },
  addText: {
    color: Colors.white,
    fontSize: 18,
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
    width: 150,
    ...Platform.select({
      ios: {
        width: 160,
      },
    }),
  },
  count: {
    color: Colors.white,
    fontSize: 28,
    fontFamily: 'latoBold',
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
  decrease: {
    alignItems: 'center',
    backgroundColor: Colors.orange,
    borderBottomLeftRadius: 6,
    justifyContent: 'center',
    width: 40,
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
  finalPrice: {
    color: Colors.green,
    fontSize: 15,
    fontFamily: 'latoBold',
    marginRight: 10,
    ...Platform.select({
      ios: {
        fontSize: 14,
      },
    }),
  },
  increase: {
    alignItems: 'center',
    backgroundColor: Colors.orange,
    borderBottomRightRadius: 6,
    justifyContent: 'center',
    width: 40,
  },
  info: {
    backgroundColor: Colors.white,
    height: 80,
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  name: {
    color: Colors.darkGrey,
    fontSize: 13,
    fontFamily: 'latoBold',
    marginBottom: 5,
    ...Platform.select({
      ios: {
        fontSize: 12,
      },
    }),
  },
  price: {
    color: Colors.red,
    fontSize: 15,
    textDecorationLine: 'line-through',
    ...Platform.select({
      ios: {
        fontSize: 14,
      },
    }),
  },
  priceBox: {
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    textAlign: 'center',
  },
  priceWithNotDiscount: {
    fontSize: 15,
    fontFamily: 'latoBold',
  },
  productImage: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    height: 100,
    width: 90,
  },
  quantity: {
    alignSelf: 'center',
    color: Colors.black,
    fontSize: 20,
    justifyContent: 'center',
    textAlign: 'center',
    width: 60,
  },
});

export default ProductCardHorizontal;
