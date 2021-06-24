import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import RequestStatus from '@/constants/RequestStatus';
import SCREEN_NAMES from '@/constants/screenNames';
import useAddress from '@/hooks/useAddress';
import useUserFromRedux from '@/hooks/useUserFromRedux';
import { RootStackParamList } from '@/types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useCallback } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';

const AddressSelected: FC = () => {
  const { address } = useAddress();
  const { loadingStatus } = useUserFromRedux();
  const navigation = useNavigation<
    StackNavigationProp<RootStackParamList, SCREEN_NAMES.ROOT>
  >();
  const onPress = useCallback(() => {
    navigation.navigate(SCREEN_NAMES.SELECT_ADDRESS, {});
  }, [navigation]);

  return loadingStatus === RequestStatus.REQUEST_LOADED ? (
    <View style={style.container}>
      <TouchableOpacity onPress={onPress} style={style.touchable}>
        <View style={style.headerLocation}>
          <Image
            style={style.marker}
            resizeMode="contain"
            source={require('assets/images/marker.png')}
          />
          <Text style={style.markerText}>{address?.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  ) : (
    <View></View>
  );
};

const style = StyleSheet.create({
  container: {
    borderBottomColor: Colors.lineGrey,
    borderBottomWidth: 1,
  },
  headerLocation: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  marker: {
    height: 20,
    marginRight: 5,
    width: 20,
  },
  markerText: {
    color: Colors.darkGrey,
    marginTop: 2,
  },
  touchable: {
    paddingVertical: 15,
  },
});

export default AddressSelected;
