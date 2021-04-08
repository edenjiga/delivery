import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { Button, StyleSheet } from 'react-native';
import { Text, View, ViewProps } from './Themed';

type Props = {
  title?: string;
  viewStyles?: ViewProps;
};

const GoBackButton: FC<Props> = ({ title, viewStyles }) => {
  const navigation = useNavigation();

  return (
    <View style={[style.container, viewStyles]}>
      <Button title="arrow" onPress={() => navigation.goBack()}></Button>
      <Text>{title}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 47,
  },
});

export default GoBackButton;
