/* eslint-disable react/display-name */
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import { store } from './store';
import Loader from './components/Loader';
import Colors from './constants/Colors';
import SocketEventHandle from './components/SocketEventHandle';
import './store/sagas';

function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <SocketEventHandle />
        <SafeAreaView style={styles.topSafeArea} />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
          >
          <Navigation />
          <StatusBar />
          <Loader />
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSafeArea: {
    backgroundColor: Colors.orangeDark,
    paddingBottom: 30,
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
