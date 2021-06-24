import React, { FC, useCallback, useMemo } from 'react';

import { HandleErrorMessage } from '@/utils/errorMessages';
import useModal from '@/hooks/useModal';
import useUserFromRedux from '@/hooks/useUserFromRedux';
import { RootStackParamList } from '@/types';
import { updateUserRequest } from '@/utils/user';
import { Address } from '@edenjiga/delivery-common';
import { StackNavigationProp } from '@react-navigation/stack';
import AddAddressScreen from './AddAddressScreen';
import { RouteProp } from '@react-navigation/native';
import SCREEN_NAMES from '@/constants/screenNames';
import useAddress from '@/hooks/useAddress';
type Props = {
  navigation: StackNavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, SCREEN_NAMES.ADD_ADDRESS>;
};
const AddAddressScreenContainer: FC<Props> = ({ navigation, route }) => {
  const { data: user } = useUserFromRedux();
  const { showModal } = useModal();
  const { setAddress } = useAddress();

  const { goTo } = useMemo(() => route.params, [route.params]);

  const onSubmit = useCallback(
    async (address: Address) => {
      const mergedAddress = [...(user.address || []), address];
      try {
        await updateUserRequest({ address: mergedAddress });

        if (goTo) {
          setAddress(address);
          return navigation.replace(goTo);
        }
        return navigation.goBack();
      } catch (error) {
        const message = HandleErrorMessage(error.message);
        showModal({ text: message });
      }
    },
    [goTo, navigation, setAddress, showModal, user.address],
  );

  return <AddAddressScreen onSubmit={onSubmit} />;
};

export default AddAddressScreenContainer;
