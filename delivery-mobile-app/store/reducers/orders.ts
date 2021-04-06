import { ActionType, createReducer } from 'typesafe-actions';
import * as orderActions from '@/store/actions/orders';
import { IOrdersState } from '@/types';
import RequestStatus from '@/constants/RequestStatus';

type Actions = ActionType<typeof orderActions>;

const initialState: IOrdersState = {
  data: {},
  loadingStatus: RequestStatus.REQUEST_NOT_LOADED,
};

const reducer = createReducer<IOrdersState, Actions>(initialState)
  .handleAction(orderActions.addOrder, (state, action) => {
    const { payload } = action;

    return { ...state, data: { ...state.data, [payload._id]: payload } };
  })
  .handleAction(
    orderActions.fetchUnfinishedOrdersAsync.success,
    (state, action) => {
      const { payload } = action;
      return {
        ...state,
        loadingStatus: RequestStatus.REQUEST_LOADED,
        data: {
          ...state.data,
          ...payload,
        },
      };
    },
  )
  .handleAction(orderActions.fetchUnfinishedOrdersAsync.failure, (state) => {
    return { ...state, loadingStatus: RequestStatus.REQUEST_FAILED };
  })
  .handleAction(orderActions.orderUpdatedAction, (state, action) => {
    const { payload } = action;
    return { ...state, data: { ...state.data, [payload._id]: payload } };
  });

export default reducer;
