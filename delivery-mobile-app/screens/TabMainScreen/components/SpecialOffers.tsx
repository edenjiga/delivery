import React, { useEffect, useState } from 'react';
import { View, Text } from '@/components/Themed';
import { getProducts } from '@/api/products';
import { Product } from '@edenjiga/delivery-common';
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Colors from '@/constants/Colors';
import { ProductCardVertical } from '@/components';

export default function Component() {
  const [products, setProductState] = useState<Product[]>([]);
  useEffect(() => {
    const getProductsInPromotion = async () => {
      try {
        const productsInOffers = await getProducts({
          discount_null: false,
          _limit: 5,
        });

        setProductState(productsInOffers);
      } catch (e) {
        //TODO: handle error
        console.log(e);
      }
    };

    getProductsInPromotion();
  }, []);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Ofertas especiales</Text>
        <View style={styles.box}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.productCard}>
              {products.map((product) => (
                <ProductCardVertical product={product} key={product._id} />
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: Colors.lightgrey,
    justifyContent: 'center',
    width: '100%',
  },
  container: {
    flex: 1,
  },
  productCard: {
    backgroundColor: Colors.lightgrey,
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 15,
  },
  title: {
    backgroundColor: Colors.lightgrey,
    color: Colors.black,
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});
