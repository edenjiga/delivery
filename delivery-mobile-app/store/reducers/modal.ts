import { ActionType, createReducer } from 'typesafe-actions';
import * as modalActions from '@/store/actions/modal';
import { IModalState } from '@/types';

type Action = ActionType<typeof modalActions>;

const initialState: IModalState = {
  isVisible: false,
  text: '',
  buttonText: '',
  icon: 'info',
};

const reducer = createReducer<IModalState, Action>(initialState)
  .handleAction(modalActions.setModalState, (state, action) => {
    return { ...state, ...action.payload };
  })
  .handleAction(modalActions.setModalIsVisibleState, (state, action) => {
    const { payload } = action;
    return { ...state, isVisible: payload };
  });

export default reducer;
