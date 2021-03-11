import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { loaderService } from '@/utils/loader';


const Loader = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    loaderService.onChange((newValue: boolean) => {
      setIsVisible(newValue);
    });
  }, []);

  return isVisible ? (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color="#F28A34"
        animating={isVisible}
      />
    </View>
  ) : null;
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    height: '100%',
    justifyContent: 'center',
    left: 0,
    opacity: 0.5,
    position: 'absolute',
    width: '100%',
    zIndex: 100,
  },
});

export default Loader;
