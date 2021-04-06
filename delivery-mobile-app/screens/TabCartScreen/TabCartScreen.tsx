import React, { FC } from 'react';
import { Text, View } from '@/components/Themed';
import { ProductWithQuantity } from '@/types';
import { Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProductCardHorizontal } from '@/components';

type Props = {
  onGoToPay(): void;
  productWithQuantity: ProductWithQuantity[];
  total: number;
};

const TabCartScreen: FC<Props> = ({
  onGoToPay,
  productWithQuantity = [],
  total,
}) => (
  <SafeAreaView>
    <View>
      {productWithQuantity.map(({ product }) => (
        <ProductCardHorizontal product={product} key={product._id} />
      ))}

      <Text>Subtotal {total}</Text>

      {!!productWithQuantity.length && (
        <Button title="Ir a pagar" onPress={onGoToPay} />
      )}
    </View>
  </SafeAreaView>
);

export default TabCartScreen;
