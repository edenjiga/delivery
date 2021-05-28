import React, { FC } from 'react';
import LocationScreen from './LocationScreen';
import { Address } from '@edenjiga/delivery-common';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types';
import SCREEN_NAMES from '@/constants/screenNames';
import useAddress from '@/hooks/useAddress';
import useModal from '@/hooks/useModal';
import { HandleErrorMessage } from '@/utils/errorMessages';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, SCREEN_NAMES.LOCATION>;
}

const LocationScreenContainer: FC<Props> = ({ navigation }) => {
  const { setAddress } = useAddress();
  const { showModal } = useModal();

  const onSubmit = async (data: Address) => {
    try {
      await setAddress(data);
      navigation.replace(SCREEN_NAMES.ROOT);
    } catch (error) {
      const message = HandleErrorMessage(error.message);
      showModal({ text: message });
    }
  };

  return <LocationScreen onSubmit={onSubmit} />;
};

export default LocationScreenContainer;
