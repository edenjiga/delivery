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
import { setModalIsVisibleState } from '@/store/actions/modal';
import Colors from '@/constants/Colors';

const Modal: FC = () => {
  const dispatch = useDispatch();
  const { isVisible, text: modalText } = useSelector<RootState, IModalState>(
    (state) => state.modal,
  );

  const setIsVisible = useCallback(
    (value: boolean) => {
      dispatch(setModalIsVisibleState(value));
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

          <Text style={styles.textInfo}>{modalText}</Text>
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
    fontWeight: 'bold',
  },
  container: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    flex: 1,
    justifyContent: 'center',
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
    marginBottom: 15,
    textAlign: 'center',
    textTransform: 'uppercase',
    width: '70%',
  },
});
export default Modal;
