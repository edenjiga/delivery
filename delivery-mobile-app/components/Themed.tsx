/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as React from 'react';
import {
  Text as DefaultText,
  TextInput as DefaultTextInput,
  View as DefaultView,
  KeyboardAvoidingView as DefaultKeyboardAvoidingView,
  Platform,
  StyleSheet
} from 'react-native';

import Colors from '../constants/Colors';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = DefaultText['props'];
export type TextInputProps = ThemeProps & DefaultTextInput['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type KeyboardAvoidingViewProps = ThemeProps &
  DefaultKeyboardAvoidingView['props'];

export function Text(props: TextProps) {
  const { style, ...otherProps } = props;

  return <DefaultText style={[styles.text, style]} {...otherProps} />;
}

export function TextInput(props: TextInputProps) {
  const { style, placeholderTextColor, ...otherProps } = props;

  return (
    <DefaultTextInput
      style={[styles.text, style]}
      placeholderTextColor={placeholderTextColor || Colors.grey}
      {...otherProps}
    />
  );
}

export function View(props: ViewProps) {
  const { style, ...otherProps } = props;

  return <DefaultView style={[ style ]} {...otherProps} />;
}

export function KeyboardAvoidingView(props: KeyboardAvoidingViewProps) {
  const { style, behavior, ...otherProps } = props;

  return (
    <DefaultKeyboardAvoidingView
      behavior={behavior || (Platform.OS === 'ios' ? 'padding' : 'height')}
      style={[styles.view, style]}
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({
  view: { 
    flex: 1 
  },
  text: {
    fontFamily: 'lato',
  },
});
