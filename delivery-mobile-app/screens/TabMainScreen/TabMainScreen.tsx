import React, { useMemo } from 'react';
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { View, Text } from '@/components/Themed';
import { PopularProducts, SpecialOffers, SearchProduct } from './components';
import Colors from '@/constants/Colors';
import { RootState } from '@/store';
import { IOrdersState } from '@/types';
import { useSelector } from 'react-redux';
import { ORDER_STATUS } from '@edenjiga/delivery-common';

export default function TabMainScreen() {
  const { data } = useSelector<RootState, IOrdersState>(
    (state) => state.orders,
  );

  const orderActive = useMemo(
    () =>
      Object.values(data).filter(
        ({ status }) => status === ORDER_STATUS.CREATED,
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
