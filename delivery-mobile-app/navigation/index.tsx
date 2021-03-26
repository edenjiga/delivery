import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import {
  NotFoundScreen,
  LocationScreen,
  LoginScreen,
  OrderScreen,
  SelectAddressScreen,
  UserRequiredFieldFormScreen,
  VerifyCodeScreen,
  AddAddressScreen,
} from '../screens';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import storageService from '@/utils/storageService';
import { isEmpty } from 'lodash';
import SCREEN_NAMES from '@/constants/screenNames';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={
        isEmpty(storageService.getAddress())
          ? SCREEN_NAMES.LOCATION
          : SCREEN_NAMES.ROOT
      }
    >
      <Stack.Screen
        name={SCREEN_NAMES.ADD_ADDRESS}
        component={AddAddressScreen}
      />
      <Stack.Screen name={SCREEN_NAMES.ROOT} component={BottomTabNavigator} />
      <Stack.Screen name={SCREEN_NAMES.LOCATION} component={LocationScreen} />
      <Stack.Screen name={SCREEN_NAMES.LOGIN} component={LoginScreen} />
      <Stack.Screen name={SCREEN_NAMES.ORDER} component={OrderScreen} />
      <Stack.Screen
        name={SCREEN_NAMES.SELECT_ADDRESS}
        component={SelectAddressScreen}
      />
      <Stack.Screen
        name={SCREEN_NAMES.USER_REQUIRED_FIELDS_FORM}
        component={UserRequiredFieldFormScreen}
      />
      <Stack.Screen
        name={SCREEN_NAMES.VERIFY_CODE}
        component={VerifyCodeScreen}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
    </Stack.Navigator>
  );
}
