import { View } from '@/components/Themed';
import { Product } from '@edenjiga/delivery-common';
import React, { FC } from 'react';
import { NotFound } from './components';
import {
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { ProductCardHorizontal } from '@/components';
import Colors from '@/constants/Colors';
import { GoBackButton } from '@/components';

type Props = {
  isLoading: boolean;
  onChangeText(text: string): void;
  products: Array<Product>;
  text: string;
};

const TabSearchScreen: FC<Props> = ({
  onChangeText,
  products,
  text,
  isLoading,
}) => {
  const showNotFound = !products.length && text;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <GoBackButton />
      </View>
      <View style={styles.box}>
        <Image
          style={styles.search}
          resizeMode="contain"
          source={require('assets/images/search.png')}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          defaultValue={''}
          value={text}
          placeholderTextColor={Colors.lightgrey}
          placeholder={'¿Qué deseas disfrutar hoy?'}
        />
        <View style={styles.close}>
          <TouchableOpacity
            onPress={() => {
              onChangeText('');
            }}
          >
            <Image
              style={styles.closeIcon}
              resizeMode="contain"
              source={require('assets/images/closeIcon.png')}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        {!isLoading && (
          <View>
            {products.map((product) => (
              <ProductCardHorizontal key={product._id} product={product} />
            ))}

            {showNotFound ? <NotFound /> : null}
          </View>
        )}
      </ScrollView>
    </View>
  );
};
export default TabSearchScreen;

const styles = StyleSheet.create({
  box: {
    paddingHorizontal: 10,
  },
  close: {
    position: 'absolute',
    right: 22,
    top: 30,
    zIndex: 10,
  },
  closeIcon: {
    height: 22,
    width: 22,
  },
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  header: {
    borderBottomColor: Colors.lineGrey,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: Colors.whiteGrey,
    borderColor: Colors.lineGrey,
    borderRadius: 14,
    borderWidth: 1,
    marginVertical: 20,
    minHeight: 40,
    paddingHorizontal: 45,
    paddingVertical: 5,
  },
  search: {
    height: 22,
    left: 22,
    position: 'absolute',
    top: 30,
    width: 22,
    zIndex: 1,
  },
});
