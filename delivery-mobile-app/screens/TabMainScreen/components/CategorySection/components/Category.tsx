import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import SCREEN_NAMES from '@/constants/screenNames';
import { RootStackParamList } from '@/types';
import { PRODUCT_CATEGORY } from '@edenjiga/delivery-common';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import React, { FC, useCallback } from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
// import A from '';

type Props = {
  name: string;
  imageSource: any;
  category: PRODUCT_CATEGORY;
  //   imageURLk
};

const Category: FC<Props> = ({ name, imageSource, category }) => {
  const navigation = useNavigation<
    NavigationProp<RootStackParamList, SCREEN_NAMES.ROOT>
  >();

  const onPressImage = useCallback(() => {
    navigation.navigate(SCREEN_NAMES.SEARCH_PRODUCT_BY_CATEGORY, { category });
  }, [category, navigation]);
  return (
    <View style={style.container}>
      <Pressable style={style.pressable} onPress={onPressImage}>
        <Image style={style.image} source={imageSource} />
      </Pressable>
      <Text>{name}</Text>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '30%',
  },
  image: {
    borderRadius: 8,
    // height: 80,
    width: '100%',
  },
  pressable: {
    width: '100%',
  },
});

export default Category;
