import React, { Component } from 'react';
import { Platform, StyleSheet, Image } from 'react-native';
import { View, Text } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { saveError } from '@/api/errors';

export default class ErrorBoundary extends Component {
  state = { hasError: false, error: undefined };

  async componentDidCatch({ message, data, stackTrace }, info) {
    const OS = Platform.OS === 'ios' ? 'ios' : 'android';
    const platform = `${OS}, ${Platform.Version}`;
    const error = {
      message,
      data,
      platform,
      stackTrace: stackTrace || info.componentStack.toString(),
    };

    try {
      await saveError(error);
    } catch (error) {
    } finally {
      this.setState({ hasError: true, error });
    }
  }

  render() {
    return this.state.hasError ? (
      <View style={styles.container}>
        <Image
          style={styles.background}
          source={require('assets/images/background.png')}
        />
        <View style={styles.infoCont}>
          <Text style={styles.title}>¡Oh, no!</Text>
          <Text style={styles.subTitle}>Algo salió mal</Text>
          <Text style={styles.description}>
            En estos momentos estamos presentando una falla, por favor inténtalo
            más tarde
          </Text>
          <Image
            style={styles.image}
            source={require('assets/images/empty-box.png')}
          />
        </View>
      </View>
    ) : (
      this.props.children
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
  },
  infoCont: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    color: Colors.darkGrey,
    fontSize: 19,
    paddingHorizontal: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    height: 240,
    top: 50,
    resizeMode: 'contain',
    width: 240,
  },
  title: {
    color: Colors.darkGrey,
    fontSize: 30,
    fontFamily: 'latoBold',
  },
  subTitle: {
    color: Colors.darkGrey,
    fontSize: 30,
    fontFamily: 'latoBold',
    marginBottom: 30,
  },
});
