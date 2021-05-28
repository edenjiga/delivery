import React, { Component } from 'react';
import { Platform } from 'react-native';
import { View } from './Themed';
// import { ErrorScreen } from '../ErrorScreen';

export default class ErrorBoundary extends Component {
  state = { hasError: false, error: undefined };

  componentDidCatch({ message, data, stackTrace }, info) {
    const OS = Platform.OS === 'ios' ? 'ios' : 'android';
    const platform = `${OS}, ${Platform.Version}`;
    const error = {
      message,
      data,
      platform,
      stackTrace: stackTrace || info.componentStack.toString(),
    };
    // errorService.saveError(error);
    this.setState({ hasError: true, error });
  }

  render() {
    return this.state.hasError ? (
      <View></View>
      // <ErrorScreen error={this.state.error} />
    ) : (
      this.props.children
    );
  }
}
