import React, { FC, useCallback } from 'react';
import {
  Modal as DefaultModal,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Text, View } from '@/components/Themed';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { IModalState } from '@/types';
import { setModalState } from '@/store/actions/modal';
import Colors from '@/constants/Colors';

const Modal: FC = () => {
  const dispatch = useDispatch();
  const { isVisible, text: modalText } = useSelector<RootState, IModalState>(
    (state) => state.modal,
  );

  const setIsVisible = useCallback(
    (value: boolean) => {
      dispatch(setModalState({ isVisible: value }));
    },
    [dispatch],
  );

  return (
    <DefaultModal visible={isVisible} transparent={true}>
      <View style={styles.container}>
        <View style={styles.centeredView}>
          <View style={styles.header}>
            <Image
              style={styles.infoIcon}
              resizeMode="contain"
              source={require('assets/images/info.png')}
            />
          </View>
          <View style={styles.closeWrapper}>
            <TouchableOpacity
              onPress={() => setIsVisible(false)}
              style={styles.imageClose}
            >
              <Image
                style={styles.closeIcon}
                resizeMode="contain"
                source={require('assets/images/orangeClose.png')}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.textInfo}>¿seguro que Deseas cerrar sesión?</Text>
          <Text style={styles.textDescription}>No se aplicarán cargos</Text>
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
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: Colors.orange,
    width: '100%',
    borderTopStartRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    backgroundColor: Colors.white,
    width: '70%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,

    shadowOffset: { width: 0, height: 0 },
    shadowColor: Colors.lightgrey,
    shadowOpacity: 0.6,
    elevation: 2,
  },
  textInfo: {
    width: '70%',
    textAlign: 'center',
    textTransform: 'uppercase',
    lineHeight: 20,
  },
  textDescription: {
    width: '70%',
    textAlign: 'center',
    marginTop: 5,
  },
  close: {
    marginTop: 15,
    backgroundColor: Colors.orange,
    minHeight: 36,
    minWidth: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  closeText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 17,
  },
  closeWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  imageClose: {
    marginHorizontal: 20,
  },
  infoIcon: {
    width: 40,
    height: 40,
  },
  closeIcon: {
    width: 26,
    height: 26,
  },
});
export default Modal;
