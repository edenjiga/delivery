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
    <View style={style.containers}>
      <Category
        name="licores"
        imageSource={Licor}
        category={PRODUCT_CATEGORY.ALCOHOL}
      />
      <Category
        name="pasabocas"
        imageSource={Chips}
        category={PRODUCT_CATEGORY.MECCATOS}
      />
      <Category
        name="cigarrillos"
        imageSource={Cigarrete}
        category={PRODUCT_CATEGORY.CIGARETTES}
      />
    </View>
  </View>
);

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 10,
  },
  containers: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CategorySection;
