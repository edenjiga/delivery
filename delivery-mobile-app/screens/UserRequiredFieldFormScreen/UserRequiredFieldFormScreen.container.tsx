import { updateUser } from '@/api/user';
import SCREEN_NAMES from '@/constants/screenNames';
import { RootState } from '@/store';
import { setModalState } from '@/store/actions/modal';
import { loginUserAsync } from '@/store/actions/user';
import { IuserState, RootStackParamList } from '@/types';
import storageService from '@/utils/storageService';
import { UserPublicFields } from '@edenjiga/delivery-common';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import UserRequiredFieldFormScreen from './UserRequiredFieldFormScreen';

interface Props {
  navigation: StackNavigationProp<
    RootStackParamList,
    SCREEN_NAMES.USER_REQUIRED_FIELDS_FORM
  >;
  route: RouteProp<RootStackParamList, SCREEN_NAMES.USER_REQUIRED_FIELDS_FORM>;
}

type FormValues = {
  name: string;
  email: string;
  identification: string;
};

export default ({ navigation, route }: Props) => {
  const { goTo } = route.params;

  const dispatch = useDispatch();

  const { data: user } = useSelector<RootState, IuserState>(
    (state) => state.user,
  );

  const { register, setValue, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      email: user.email,
      name: user.name,
      identification: user.identification,
    },
  });

  useEffect(() => {
    register('email', {
      required: { value: true, message: 'Email es requerido' },
      pattern: {
        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'Debe ser un email',
      },
    });

    register('identification', {
      required: { value: true, message: 'Identifiacion es requerido' },
    });
    register('name', {
      required: { value: true, message: 'Nombre es requerido' },
    });
  }, [register]);

  const onError: SubmitErrorHandler<FormValues> = (error) => {
    const message = Object.values(error).reduce(
      (prevValue, field) => `${prevValue}\n${field?.message}`,
      '',
    );

    dispatch(
      setModalState({
        buttonText: 'Confirmar',
        text: message,
        isVisible: true,
      }),
    );
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const dataToSend: UserPublicFields = Object.assign({}, data);

    const address = storageService.getAddress();
    if (!user.address?.length && address) {
      dataToSend.address = [address];
    }

    const { token, user: userUpdated } = await updateUser(dataToSend);
    await storageService.setToken(token);
    dispatch(loginUserAsync.success(userUpdated));

    return goTo ? navigation.replace(goTo) : navigation.goBack();
  };

  return (
    <UserRequiredFieldFormScreen
      setValue={setValue}
      onSubmit={handleSubmit(onSubmit, onError)}
      nameInitialValue={user.name}
      emailInitialValue={user.email}
      identificationInitialValue={user.identification}
    />
  );
};
