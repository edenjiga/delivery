import { GoBackButton, LocationForm } from '@/components';
import { View } from '@/components/Themed';
import { Address } from '@edenjiga/delivery-common';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';

type Props = {
  onSubmit(addres: Address): void;
};

const AddAddressScreen: FC<Props> = ({ onSubmit }) => (
  <View style={style.container}>
    <GoBackButton title="AGREGA TU UBICACIÓN" />
    <LocationForm onSubmit={onSubmit} />
  </View>
);

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AddAddressScreen;
