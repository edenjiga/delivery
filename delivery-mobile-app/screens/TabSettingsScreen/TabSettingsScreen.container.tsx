import SCREEN_NAMES from '@/constants/screenNames';
import { RootState } from '@/store';
import { logOut as userLogOutAction } from '@/store/actions/user';
import { IuserState, RootStackParamList } from '@/types';
import storageService from '@/utils/storageService';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TabSettingsScreen from './TabSettingsScreen';

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const TabSettingsScreenContainer: FC<Props> = ({ navigation }) => {
  const address = storageService.getAddress();
  const dispatch = useDispatch();
  const { loadingStatus } = useSelector<RootState, IuserState>(
    (state) => state.user,
  );
  const onPressLogOut = useCallback(() => {
    dispatch(userLogOutAction());
  }, [dispatch]);
  const onGoToSelectAddress = useCallback(
    () => navigation.navigate(SCREEN_NAMES.SELECT_ADDRESS),
    [navigation],
  );
  return (
    <TabSettingsScreen
      address={address}
      onGoToSelectAddress={onGoToSelectAddress}
      onPressLogOut={onPressLogOut}
      loadingStatus={loadingStatus}
    />
  );
};

export default TabSettingsScreenContainer;
