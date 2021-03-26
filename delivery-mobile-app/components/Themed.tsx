import * as React from 'react';
import {
  Text as DefaultText,
  TextInput as DefaultTextInput,
  View as DefaultView,
  KeyboardAvoidingView as DefaultKeyboardAvoidingView,
  Platform,
} from 'react-native';

import Colors from '../constants/Colors';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type TextInputProps = ThemeProps & DefaultTextInput['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type KeyboardAvoidingViewProps = ThemeProps &
  DefaultKeyboardAvoidingView['props'];

export function Text(props: TextProps) {
  const { style, ...otherProps } = props;
  const color = Colors.black;

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function TextInput(props: TextInputProps) {
  const { style, placeholderTextColor, ...otherProps } = props;

  return (
    <DefaultTextInput
      style={[styles.textInput, style]}
      placeholderTextColor={placeholderTextColor || Colors.grey}
      {...otherProps}
    />
  );
}

export function View(props: ViewProps) {
  const { style, ...otherProps } = props;

  return <DefaultView style={[styles.view, style]} {...otherProps} />;
}

export function KeyboardAvoidingView(props: KeyboardAvoidingViewProps) {
  const { style, behavior, ...otherProps } = props;

  return (
    <DefaultKeyboardAvoidingView
      behavior={behavior || (Platform.OS === 'ios' ? 'padding' : 'height')}
      style={[styles.defaultKeyboardAvoidingView, style]}
      {...otherProps}
    />
  );
}

const styles = {
  defaultKeyboardAvoidingView: { flex: 1 },
  view: {},
  textInput: {
    borderColor: Colors.grey,
    fontSize: 13,
  },
};
