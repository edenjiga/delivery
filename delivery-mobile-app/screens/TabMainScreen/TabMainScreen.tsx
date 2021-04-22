import React from 'react';
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { View } from '@/components/Themed';
import {
  AddressSelected,
  CategorySection,
  PopularProducts,
  SpecialOffers,
  SearchProduct,
  OrderActives,
} from './components';
import Colors from '@/constants/Colors';

export default function TabMainScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          <AddressSelected />
          <OrderActives />
          <CategorySection />
          {/* <SearchProduct /> */}
          <SpecialOffers />
          <PopularProducts />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
});
