import { ActionType, createReducer } from 'typesafe-actions';
import * as settingsActions from '@/store/actions/settings';
import { GetSettingsResponse } from '@edenjiga/delivery-common';

type Action = ActionType<typeof settingsActions>;

const initialState: Partial<GetSettingsResponse> = {};

const reducer = createReducer<typeof initialState, Action>(
  initialState,
).handleAction(settingsActions.setSettings, (state, action) => {
  const { payload } = action;
  return { ...state, ...payload };
});

export default reducer;
