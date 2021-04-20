import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import SCREEN_NAMES from '@/constants/screenNames';
import { RootStackParamList } from '@/types';
import storageService from '@/utils/storageService';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useCallback } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';

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
        <View style={style.headerLocation}>
          <Image
            style={style.marker}
            resizeMode="contain"
            source={require('assets/images/marker.png')}
          />
          <Text style={style.markerText}>
            {address?.name}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    borderBottomColor: Colors.lineGrey,
    borderBottomWidth: 1,
  },
  touchable: {
    paddingVertical: 10,
  },
  headerLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  marker: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  markerText: {
    color: Colors.darkGrey,
    marginTop: 2,
  },
});

export default AddressSelected;
