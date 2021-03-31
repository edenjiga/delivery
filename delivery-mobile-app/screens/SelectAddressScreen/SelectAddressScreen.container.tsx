import SCREEN_NAMES from '@/constants/screenNames';
import useUserFromRedux from '@/hooks/useUserFromRedux';
import { RootStackParamList } from '@/types';
import storageService from '@/utils/storageService';
import { Address } from '@edenjiga/delivery-common';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useCallback, useMemo, useState } from 'react';
import SelectAddressScreen from './SelectAddressScreen';

type Props = {
  navigation: StackNavigationProp<RootStackParamList>;
};

const SelectAddressScreenContainer: FC<Props> = ({ navigation }) => {
  const {
    data: { address = [] },
  } = useUserFromRedux();
  const [selectedAddress, setSelectedAddress] = useState(
    storageService.getAddress(),
  );

  const actions = useMemo(
    () => [
      {
        text: 'Agregar direccion',
        //   icon: require("./images/ic_language_white.png"),
        name: 'add_address',
        position: 1,
      },
    ],
    [],
  );

  const onPressItem = useCallback(
    (name: string | undefined) => {
      navigation.navigate(SCREEN_NAMES.ADD_ADDRESS);
    },
    [navigation],
  );

  const onPressAddress = async (address: Address) => {
    setSelectedAddress(address);
    await storageService.setAddress(address);
    navigation.goBack();
  };
  return (
    <SelectAddressScreen
      actions={actions}
      onPressItem={onPressItem}
      address={address}
      selectedAddress={selectedAddress}
      onPressAddress={onPressAddress}
    />
  );
};

export default SelectAddressScreenContainer;
