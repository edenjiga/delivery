import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import SCREEN_NAMES from '@/constants/screenNames';
import { RootStackParamList } from '@/types';
import storageService from '@/utils/storageService';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AddressSelected: FC = () => {
  const address = storageService.getAddress();

  const navigation = useNavigation<
    StackNavigationProp<RootStackParamList, SCREEN_NAMES.ROOT>
  >();
  const onPress = useCallback(() => {
    navigation.navigate(SCREEN_NAMES.SELECT_ADDRESS);
  }, [navigation]);

  return (
    <View style={style.container}>
      <TouchableOpacity onPress={onPress} style={style.touchable}>
        <Text>{address?.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    borderBottomColor: Colors.grey,
    borderBottomWidth: 1,
  },
  touchable: {
    marginHorizontal: 10,
    width: '50%',
  },
});

export default AddressSelected;
