import { RootState } from '@/store';
import { setModalIsVisibleState, setModalState } from '@/store/actions/modal';
import { IModalState } from '@/types';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useModal = () => {
  const dispatch = useDispatch();
  const modalState = useSelector<RootState, IModalState>(
    (state) => state.modal,
  );

  const showModal = useCallback(
    ({
      text,
      buttonText = 'Confirmar',
      icon = 'info',
    }: {
      text: string;
      buttonText?: string;
      icon?: IModalState['icon'];
    }) => {
      dispatch(
        setModalState({
          isVisible: true,
          text,
          buttonText,
          icon,
        }),
      );
    },
    [dispatch],
  );

  const setIsVisible = useCallback(
    (value: boolean) => {
      dispatch(setModalIsVisibleState(value));
    },
    [dispatch],
  );

  return { ...modalState, showModal, setIsVisible };
};

export default useModal;
