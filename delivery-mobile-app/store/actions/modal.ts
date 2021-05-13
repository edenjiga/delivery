import { IModalState } from '@/types';
import { createAction } from 'typesafe-actions';

export enum types {
  SET_VISIBLE = 'SET_VISIBLE',
  SET_MODAL = 'SET_MODAL',
}

export const setModalState = createAction(types.SET_MODAL)<IModalState>();
export const setModalIsVisibleState = createAction(types.SET_VISIBLE)<
  IModalState['isVisible']
>();
