import SCREEN_NAMES from '@/constants/screenNames';
import useUserFromRedux from '@/hooks/useUserFromRedux';
import { logOut as userLogOutAction } from '@/store/actions/user';
import { RootStackParamList } from '@/types';
import storageService from '@/utils/storageService';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import TabSettingsScreen from './TabSettingsScreen';

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const TabSettingsScreenContainer: FC<Props> = ({ navigation }) => {
  const address = storageService.getAddress();
  const { loadingStatus, data: user } = useUserFromRedux();
  const dispatch = useDispatch();

  const onPressLogOut = useCallback(() => {
    dispatch(userLogOutAction());
  }, [dispatch]);

  const onGoToSelectAddress = useCallback(
    () => navigation.navigate(SCREEN_NAMES.SELECT_ADDRESS),
    [navigation],
  );

  const onGoToMyOrders = useCallback(
    () => navigation.navigate(SCREEN_NAMES.MY_ORDERS),
    [navigation],
  );

  const onGoToEditUserInfo = useCallback(
    () => navigation.navigate(SCREEN_NAMES.USER_REQUIRED_FIELDS_FORM, {}),
    [navigation],
  );

  return (
    <TabSettingsScreen
      address={address}
      loadingStatus={loadingStatus}
      onGoToEditUserInfo={onGoToEditUserInfo}
      onGoToSelectAddress={onGoToSelectAddress}
      onGoToMyOrders={onGoToMyOrders}
      onPressLogOut={onPressLogOut}
      user={user}
    />
  );
};

export default TabSettingsScreenContainer;
