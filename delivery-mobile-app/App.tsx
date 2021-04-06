/* eslint-disable react/display-name */
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import { store } from './store';
import Loader from './components/Loader';
import Colors from './constants/Colors';
import './store/sagas';

function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.SafeAreaViewStyle}>
          <Navigation />
          <StatusBar backgroundColor={Colors.orangeDark} />
          <Loader />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  SafeAreaViewStyle: {
    flex: 1,
  },
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Component() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
