import { Text, View } from '@/components/Themed';
import React, { FC } from 'react';
import { Image, StyleSheet } from 'react-native';
// import A from '';

type Props = {
  name: string;
  imageSource: any;
  //   imageURLk
};

const Category: FC<Props> = ({ name, imageSource }) => (
  <View style={style.container}>
    <Image style={style.image} source={imageSource} />
    <Text>{name}</Text>
  </View>
);

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
});

export default Category;
