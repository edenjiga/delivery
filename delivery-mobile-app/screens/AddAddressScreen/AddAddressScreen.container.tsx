import React, { FC, useCallback } from 'react';

import { HandleErrorMessage } from '@/utils/errorMessages';
import useModal from '@/hooks/useModal';
import useUserFromRedux from '@/hooks/useUserFromRedux';
import { RootStackParamList } from '@/types';
import { updateUserRequest } from '@/utils/user';
import { Address } from '@edenjiga/delivery-common';
import { StackNavigationProp } from '@react-navigation/stack';
import AddAddressScreen from './AddAddressScreen';
type Props = {
  navigation: StackNavigationProp<RootStackParamList>;
};
const AddAddressScreenContainer: FC<Props> = ({ navigation }) => {
  const { data: user } = useUserFromRedux();
  const { showModal } = useModal();

  const onSubmit = useCallback(
    async (address: Address) => {
      const mergedAddress = [...(user.address || []), address];
      try {
        await updateUserRequest({ address: mergedAddress });
        navigation.goBack();
      } catch (error) {
        const message = HandleErrorMessage(error.message);
        showModal({ text: message });
      }
    },
    [navigation, showModal, user.address],
  );

  return <AddAddressScreen onSubmit={onSubmit} />;
};

export default AddAddressScreenContainer;
