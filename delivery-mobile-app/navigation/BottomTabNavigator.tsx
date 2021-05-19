import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import Colors from '../constants/Colors';
import {
  TabSettingsScreen,
  TabCartScreen,
  TabMainScreen,
  TabSearchScreen,
} from '../screens';
import { BottomTabParamList } from '../types';

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
          tabBarIcon: ({ color }) => <TabBarIcon name="cart" color={color} />,
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
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={30} {...props} />;
}
