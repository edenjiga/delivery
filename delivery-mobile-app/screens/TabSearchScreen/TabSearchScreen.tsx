import { View, Text } from '@/components/Themed';
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
        <View style={styles.headerLocation}>
          <Image
            style={styles.marker}
            resizeMode="contain"
            source={require('assets/images/marker.png')}
          />
          <Text style={styles.markerText}>Nueva Granada</Text>
        </View>
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
          placeholderTextColor={Colors.lightgrey}
          placeholder={'¿Qué deseas disfrutar hoy?'}
        />
        <View style={styles.close}>
          <TouchableOpacity
            onPress={() => {
              console.log('You tapped the button!');
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
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: Colors.lineGrey,
    borderBottomWidth: 1,
  },
  headerLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  marker: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  markerText: {
    color: Colors.darkGrey,
    marginTop: 2,
  },
  box: {
    paddingHorizontal: 10,
  },
  search: {
    width: 22,
    height: 22,
    position: 'absolute',
    left: 22,
    top: 30,
    zIndex: 1,
  },
  input: {
    backgroundColor: Colors.whiteGrey,
    borderColor: Colors.lineGrey,
    borderRadius: 14,
    borderWidth: 1,
    minHeight: 40,
    paddingVertical: 5,
    paddingHorizontal: 45,
    marginVertical: 20,
  },
  close: {
    position: 'absolute',
    right: 22,
    top: 30,
    zIndex: 10,
  },
  closeIcon: {
    width: 22,
    height: 22,
  },
});
