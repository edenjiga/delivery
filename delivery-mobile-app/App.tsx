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
import Colors from './constants/Colors';
import './store/sagas';

import {
  Loader,
  Modal,
  UpdateAppComponent,
  SocketEventHandle,
} from './components';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const { isLoadingComplete, appVersionMatch } = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }

  if (appVersionMatch) {
    return (
      <SafeAreaProvider>
        <Modal />
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

  return <UpdateAppComponent />;
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
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  );
}
