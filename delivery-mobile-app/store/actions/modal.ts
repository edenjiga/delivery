import { IModalState } from '@/types';
import { createAction } from 'typesafe-actions';

export enum types {
  SET_VISIBLE = 'SET_VISIBLE',
}

export const setModalState = createAction(types.SET_VISIBLE)<IModalState>();
