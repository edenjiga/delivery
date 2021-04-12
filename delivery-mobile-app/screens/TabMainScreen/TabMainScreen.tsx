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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <SafeAreaView>
          <ScrollView>
            <CategorySection />
            {/* <SearchProduct /> */}
            <OrderActives />
            <SpecialOffers />
            <PopularProducts />
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
});
