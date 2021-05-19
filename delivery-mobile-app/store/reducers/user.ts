import { ActionType, createReducer } from 'typesafe-actions';
import REQUEST_STATUS from '@/constants/RequestStatus';
import { IuserState } from '@/types';
import * as userActions from '@/store/actions/user';

type Actions = ActionType<typeof userActions>;

const initialState: IuserState = {
  loadingStatus: REQUEST_STATUS.REQUEST_NOT_LOADED,
  error: {},
  data: {},
};

const reducer = createReducer<IuserState, Actions>(initialState)
  .handleAction(userActions.loginUserAsync.success, (state, action) => {
    return {
      ...state,
      loadingStatus: REQUEST_STATUS.REQUEST_LOADED,
      data: action.payload,
    };
  })
  .handleAction(userActions.logOut, (state) => {
    return { ...state, ...initialState };
  });

export default reducer;
