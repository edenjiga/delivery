import React, { FC } from 'react';
import { View } from '@/components/Themed';
import { StyleSheet } from 'react-native';
import { Category } from './components';

import Beer from '@/assets/images/glass-bottles-of-beer-with-glass-and-ice-on-dark-background.png';
import Chips from '@/assets/images/top-view-different-kind-chips-texture-horizontal.png';
import Cigarrete from '@/assets/images/flat-lay-no-tobacco-day-elements-composition.png';

const CategorySection: FC = () => (
  <View style={style.container}>
    <Category name="Licores" imageSource={Beer} />
    <Category name="Pasabocas" imageSource={Chips} />
    <Category name="Cigarrillos" imageSource={Cigarrete} />
  </View>
);

const style = StyleSheet.create({
  container: {
    // display: 'flex',
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default CategorySection;
