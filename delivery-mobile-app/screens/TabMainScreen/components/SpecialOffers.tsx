import React, { useEffect, useState } from 'react';
import { View, Text } from '@/components/Themed';
import { getProducts } from '@/api/products';
import { Product } from '@edenjiga/delivery-common';
import { StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';

export default () => {
  const [products, setProductState] = useState<Product[]>([]);
  useEffect(() => {
    (async () => {
      const productsInOffers = await getProducts();
      console.log(productsInOffers);
      setProductState(productsInOffers);
    })();
  }, []);
  return (
    <SafeAreaView>
      <Text>Ofertas especiales</Text>
      <View style={{ height: 143 }}>
        <ScrollView horizontal={true} style={styles.container}>
          {products.map(({ name, price, Imagen: img }) => (
            <View style={styles.products}>
              {!!img && (
                <Image
                  style={styles.productImage}
                  source={{
                    uri: img.url,
                  }}
                />
              )}
              <Text>{name}</Text>
              <Text>{price}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  productImage: {
    width: 103,
    height: 65,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    width: 360,
  },
  products: {
    margin: 10,
    height: 103,
    width: 103,
    backgroundColor: 'red',
  },
});
