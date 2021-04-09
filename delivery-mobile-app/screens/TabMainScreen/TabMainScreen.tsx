import React, { FC, useMemo } from 'react';
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { View, Text } from '@/components/Themed';
import {
  CategorySection,
  PopularProducts,
  SpecialOffers,
  SearchProduct,
} from './components';
import Colors from '@/constants/Colors';
import { ORDER_STATUS } from '@edenjiga/delivery-common';
import useOrdersFromRedux from '@/hooks/useOrdersFromRedux';

export default function TabMainScreen(): JSX.Element {
  const { data } = useOrdersFromRedux();

  const orderActive = useMemo(
    () =>
      Object.values(data).filter(
        ({ status }) =>
          status === ORDER_STATUS.CREATED ||
          status === ORDER_STATUS.IN_PROGRESS,
      ),
    [data],
  );

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
            {!!orderActive.length && (
              <Text>Ordenes activas {orderActive.length} </Text>
            )}
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
