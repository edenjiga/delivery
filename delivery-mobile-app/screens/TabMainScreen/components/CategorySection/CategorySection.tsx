import React, { FC } from 'react';
import { View } from '@/components/Themed';
import { StyleSheet } from 'react-native';
import { Category } from './components';

import Licor from '@/assets/images/glass-bottles-of-beer-with-glass-and-ice-on-dark-background.png';
import Chips from '@/assets/images/top-view-different-kind-chips-texture-horizontal.png';
import Cigarrete from '@/assets/images/flat-lay-no-tobacco-day-elements-composition.png';
import { PRODUCT_CATEGORY } from '@edenjiga/delivery-common';

const CategorySection: FC = () => (
  <View style={style.container}>
    <Category
      name="Licores"
      imageSource={Licor}
      category={PRODUCT_CATEGORY.ALCOHOL}
    />
    <Category
      name="Pasabocas"
      imageSource={Chips}
      category={PRODUCT_CATEGORY.MECCATOS}
    />
    <Category
      name="Cigarrillos"
      imageSource={Cigarrete}
      category={PRODUCT_CATEGORY.CIGARETTES}
    />
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
