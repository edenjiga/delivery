import SCREEN_NAMES from '@/constants/screenNames';
import useAddress from '@/hooks/useAddress';
import useUserFromRedux from '@/hooks/useUserFromRedux';
import { RootStackParamList } from '@/types';
import { Address } from '@edenjiga/delivery-common';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useCallback, useMemo } from 'react';
import SelectAddressScreen from './SelectAddressScreen';

type Props = {
  navigation: StackNavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, SCREEN_NAMES.SELECT_ADDRESS>;
};

const SelectAddressScreenContainer: FC<Props> = ({ navigation, route }) => {
  const { address: selectedAddress, setAddress } = useAddress();
  const {
    data: { address = [] },
  } = useUserFromRedux();

  const actions = useMemo(
    () => [
      {
        text: 'Agregar dirección',
        icon: require('assets/images/marker.png'),
        name: 'add_address',
        position: 1,
      },
    ],
    [],
  );

  const onPressItem = useCallback(
    (name: string | undefined) => {
      navigation.navigate(SCREEN_NAMES.ADD_ADDRESS, {});
    },
    [navigation],
  );

  const onPressAddress = async (address: Address) => {
    try {
      await setAddress(address);

      const { goTo } = route.params || {};
      if (goTo) {
        return navigation.replace(goTo);
      }

      return navigation.goBack();
    } catch (err) {
      //TODO fill error
    }
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
