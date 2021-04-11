import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import SCREEN_NAMES from '@/constants/screenNames';
import { RootStackParamList } from '@/types';
import { PRODUCT_CATEGORY } from '@edenjiga/delivery-common';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { FC, useCallback } from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';

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
      <TouchableOpacity style={style.pressable} onPress={onPressImage}>
        <Image style={style.image} source={imageSource} />
      </TouchableOpacity>
      <Text style={style.title}>{name}</Text>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '32%',
  },
  image: {
    borderRadius: 6,
    height: 70,
    resizeMode: 'cover',
    width: '100%',
  },
  pressable: {
    width: '100%',
  },
  title: {
    color: Colors.darkGrey,
    marginTop: 3,
    textTransform: 'capitalize',
  },
});

export default Category;
