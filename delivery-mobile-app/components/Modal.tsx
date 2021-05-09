import React, { FC, useCallback } from 'react';
import { Button, Modal as DefaultModal, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { IModalState } from '@/types';
import { setModalState } from '@/store/actions/modal';
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
    <DefaultModal visible={isVisible}>
      <View style={styles.centeredView}>
        <Text>{modalText}</Text>
        <Button title="Cerrar" onPress={() => setIsVisible(false)}></Button>
      </View>
    </DefaultModal>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: 22,
  },
});
export default Modal;
