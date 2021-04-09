import { ActionType, createReducer } from 'typesafe-actions';
import * as orderActions from '@/store/actions/orders';
import { OrdersState } from '@/types';
import RequestStatus from '@/constants/RequestStatus';

type Actions = ActionType<typeof orderActions>;

const initialState: OrdersState = {
  data: {},
  fetchUnfinishOrderStatus: RequestStatus.REQUEST_NOT_LOADED,
  fetchOrderStatus: RequestStatus.REQUEST_NOT_LOADED,
};

const reducer = createReducer<OrdersState, Actions>(initialState)
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
        fetchUnfinishOrderStatus: RequestStatus.REQUEST_LOADED,
        data: {
          ...state.data,
          ...payload,
        },
      };
    },
  )
  .handleAction(orderActions.fetchUnfinishedOrdersAsync.failure, (state) => {
    return { ...state, fetchUnfinishOrderStatus: RequestStatus.REQUEST_FAILED };
  })
  .handleAction(orderActions.orderUpdatedAction, (state, action) => {
    const { payload } = action;
    return { ...state, data: { ...state.data, [payload._id]: payload } };
  })
  .handleAction(orderActions.fetchOrdersAsync.success, (state, action) => {
    const { payload } = action;

    return {
      ...state,
      fetchOrderStatus: RequestStatus.REQUEST_LOADED,
      data: {
        ...state.data,
        ...payload,
      },
    };
  })
  .handleAction(orderActions.fetchOrdersAsync.failure, (state) => {
    return { ...state, fetchOrderStatus: RequestStatus.REQUEST_FAILED };
  })
  .handleAction(orderActions.fetchOrdersAsync.request, (state) => {
    return { ...state, fetchOrderStatus: RequestStatus.REQUEST_LOADING };
  });
export default reducer;
