import { GetSettingsResponse } from '@edenjiga/delivery-common';
import { createAction } from 'typesafe-actions';

export enum types {
  SET_SETTINGS = 'SET_SETTINGS',
}

export const setSettings = createAction(
  types.SET_SETTINGS,
)<GetSettingsResponse>();
