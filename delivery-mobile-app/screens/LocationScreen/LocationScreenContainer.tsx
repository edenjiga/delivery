import React, { FC } from 'react';
import LocationScreen from './LocationScreen';
import { Address } from '@edenjiga/delivery-common';
import { Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types';
import SCREEN_NAMES from '@/constants/screenNames';
import useAddress from '@/hooks/useAddress';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, SCREEN_NAMES.LOCATION>;
}

const LocationScreenContainer: FC<Props> = ({ navigation }) => {
  const { setAddress } = useAddress();
  const onSubmit = async (data: Address) => {
    try {
      await setAddress(data);
      navigation.replace(SCREEN_NAMES.ROOT);
    } catch (error) {
      Alert.alert('Ups something fail');
      console.error(error);
    }
  };

  return <LocationScreen onSubmit={onSubmit} />;
};

export default LocationScreenContainer;
