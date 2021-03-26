import useUserFromRedux from '@/hooks/useUserFromRedux';
import { RootStackParamList } from '@/types';
import { updateUserRequest } from '@/utils/user';
import { Address } from '@edenjiga/delivery-common';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useCallback } from 'react';
import { Alert } from 'react-native';
import AddAddressScreen from './AddAddressScreen';
type Props = {
  navigation: StackNavigationProp<RootStackParamList>;
};
const AddAddressScreenContainer: FC<Props> = ({ navigation }) => {
  const { data: user } = useUserFromRedux();

  const onSubmit = useCallback(
    async (address: Address) => {
      const mergedAddress = [...(user.address || []), address];
      try {
        await updateUserRequest({ address: mergedAddress });
        navigation.goBack();
      } catch (error) {
        Alert.alert('Ups Algo fallo intentado agregar tu nueva direccion');
      }
    },
    [navigation, user.address],
  );

  return <AddAddressScreen onSubmit={onSubmit} />;
};

export default AddAddressScreenContainer;
