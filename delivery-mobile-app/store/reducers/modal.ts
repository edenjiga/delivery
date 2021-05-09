import { action, ActionType, createReducer } from 'typesafe-actions';
import * as modalActions from '@/store/actions/modal';
import { IModalState } from '@/types';

type Action = ActionType<typeof modalActions>;

const initialState: IModalState = {
  isVisible: true,
  text: '',
};

const reducer = createReducer<IModalState, Action>(initialState).handleAction(
  modalActions.setModalState,
  (state, action) => {
    return { ...state, ...action.payload };
  },
);

export default reducer;
