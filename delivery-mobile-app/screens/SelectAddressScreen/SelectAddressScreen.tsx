import { GoBackButton } from '@/components';
import { View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { Address } from '@edenjiga/delivery-common';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { AddressCard } from './components';

type Props = {
  actions: Array<any>;
  onPressItem(name: string | undefined): void;
  address: Address[];
  selectedAddress: Address | null;
  onPressAddress(address: Address): void;
};

const SelectAddressScren: FC<Props> = ({
  actions,
  onPressItem,
  address,
  selectedAddress,
  onPressAddress,
}: Props) => {
  return (
    <View style={style.container}>
      <View style={style.header}>
        <GoBackButton title="SELECCIONA UNA DIRECCIÓN" />
      </View>
      <View style={style.elementContainerView}>
        {address.map(({ name, nomenclature, coordinates, note }) => (
          <AddressCard
            key={`${name}${nomenclature}${coordinates.latitude}${coordinates.longitude}`}
            name={name}
            nomenclature={nomenclature}
            selected={selectedAddress?.name === name}
            onPress={() =>
              onPressAddress({
                name,
                nomenclature,
                coordinates,
                note,
              })
            }
          />
        ))}
      </View>
      <FloatingAction
        color={Colors.orange}
        actions={actions}
        onPressItem={onPressItem}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteGrey,
    flex: 1,
  },
  elementContainerView: {
    alignItems: 'center',
    marginTop: 20,
  },
  header: {
    borderBottomColor: Colors.lineGrey,
    borderBottomWidth: 1,
  },
});

export default SelectAddressScren;
