import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Text, View, ViewProps } from './Themed';
import Colors from '@/constants/Colors';

import orangeArrow from '@/assets/images/back.png';
import whiteBackArrow from '@/assets/images/backWhite.png';

type Props = {
  title?: string;
  viewStyles?: ViewProps['style'];
  backWitheArrow?: boolean;
};

const GoBackButton: FC<Props> = ({ backWitheArrow, title, viewStyles }) => {
  const navigation = useNavigation();

  return (
    <View style={[style.container, viewStyles]}>
      <TouchableOpacity style={style.back} onPress={() => navigation.goBack()}>
        <Image
          style={style.backBnt}
          resizeMode="contain"
          source={backWitheArrow ? whiteBackArrow : orangeArrow}
        />
      </TouchableOpacity>
      <Text style={style.title}>{title}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  back: {
    borderRadius: 6,
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  backBnt: {
    height: 23,
    width: 23,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    textTransform: 'uppercase',
  },
});

export default GoBackButton;
