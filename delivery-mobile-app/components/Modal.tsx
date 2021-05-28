import React, { FC } from 'react';
import {
  Modal as DefaultModal,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import useModal from '@/hooks/useModal';

const Modal: FC = () => {
  const { isVisible, text, setIsVisible, icon } = useModal();
  return (
    <DefaultModal visible={isVisible} transparent={true}>
      <View style={styles.container}>
        <View style={styles.centeredView}>
          <View style={styles.header}>
            <Image
              style={styles.infoIcon}
              resizeMode="contain"
              source={
                icon === 'success'
                  ? require('assets/images/check.png')
                  : require('assets/images/info.png')
              }
            />
          </View>
          <Text style={styles.textInfo}>{text}</Text>
          <TouchableOpacity
            style={styles.close}
            onPress={() => setIsVisible(false)}
          >
            <Text style={styles.closeText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DefaultModal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 20,
    elevation: 2,
    justifyContent: 'center',
    paddingBottom: 20,
    shadowColor: Colors.lightgrey,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    width: '70%',
  },
  close: {
    alignItems: 'center',
    backgroundColor: Colors.orange,
    borderRadius: 6,
    justifyContent: 'center',
    marginTop: 15,
    minHeight: 36,
    minWidth: 150,
  },
  closeText: {
    color: Colors.white,
    fontSize: 17,
    fontFamily: 'latoBold',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    backgroundColor: Colors.orange,
    borderTopRightRadius: 10,
    borderTopStartRadius: 10,
    justifyContent: 'center',
    marginBottom: 10,
    paddingVertical: 10,
    width: '100%',
  },
  infoIcon: {
    height: 40,
    width: 40,
  },
  textInfo: {
    lineHeight: 20,
    marginTop: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
    width: '70%',
  },
});
export default Modal;
