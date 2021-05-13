import SCREEN_NAMES from '@/constants/screenNames';
import useUserFromRedux from '@/hooks/useUserFromRedux';
import { logOut as userLogOutAction } from '@/store/actions/user';
import { RootStackParamList } from '@/types';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useCallback } from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import TabSettingsScreen from './TabSettingsScreen';

interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const TabSettingsScreenContainer: FC<Props> = ({ navigation }) => {
  const { loadingStatus, data: user } = useUserFromRedux();
  const dispatch = useDispatch();

  const onPressLogOut = useCallback(() => {
    Alert.alert('¿Seguro desean cerrar sesión?', '', [
      {
        text: 'SI',
        onPress: () => dispatch(userLogOutAction()),
        style: 'cancel',
      },
      {
        text: 'NO',
        onPress: () => {},
      },
    ]);
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

  const onGoToSuggestionScreen = useCallback(
    () => navigation.navigate(SCREEN_NAMES.USER_SUGGESTION, {}),
    [navigation],
  );

  return (
    <TabSettingsScreen
      loadingStatus={loadingStatus}
      onGoToEditUserInfo={onGoToEditUserInfo}
      onGoToSelectAddress={onGoToSelectAddress}
      onGoToMyOrders={onGoToMyOrders}
      onGoToSuggestionScreen={onGoToSuggestionScreen}
      onPressLogOut={onPressLogOut}
      user={user}
    />
  );
};

export default TabSettingsScreenContainer;
