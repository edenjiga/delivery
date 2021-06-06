import { Text, View } from '@/components/Themed';
import { RootState } from '@/store';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

import {
  TabSettingsScreen,
  TabCartScreen,
  TabMainScreen,
  TabSearchScreen,
} from '../screens';
import { BottomTabParamList, ICartState } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="TabMain"
      tabBarOptions={{ activeTintColor: Colors.orangeDark, showLabel: false }}
    >
      <BottomTab.Screen
        name="TabMain"
        component={TabMainScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home-sharp" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="TabSearch"
        component={TabSearchScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabCart"
        component={TabCartScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIconWithProductNumber name="cart" color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="TabSetting"
        component={TabSettingsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="settings-sharp" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/

function TabBarIconWithProductNumber(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  const cart = useSelector<RootState, ICartState>((state) => state.cart);

  const num = Object.keys(cart).length;

  if (num) {
    return (
      <View>
        <View style={style.box}>
          <Text style={style.counter}>{num}</Text>
        </View>
        <Ionicons size={30} {...props} />
      </View>
    );
  }
  return <Ionicons size={30} {...props} />;
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={30} {...props} />;
}

const style = StyleSheet.create({
  box: {
    alignItems: 'center',
    backgroundColor: Colors.green,
    borderRadius: 20,
    height: 20,
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
    width: 20,
    zIndex: 20,
  },
  counter: {
    color: Colors.white,
    fontFamily: 'latoBold',
    fontSize: 14,
  },
});
