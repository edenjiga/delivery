import { ActionType, createReducer } from 'typesafe-actions';
import * as cartActions from '@/store/actions/cart';
import { ICartState } from '@/types';
import { omit } from 'lodash';

type Action = ActionType<typeof cartActions>;

const initialState: ICartState = {};

const reducer = createReducer<ICartState, Action>(initialState)
  .handleAction(cartActions.addProductAction, (state, action) => {
    const { payload } = action;
    const { _id } = payload;

    let quantity = 1;

    if (state[_id]) {
      quantity = state[_id].quantity + 1;
    }

    return {
      ...state,
      [payload._id]: {
        quantity,
        product: payload,
      },
    };
  })
  .handleAction(cartActions.decreaseProductAction, (state, { payload }) => {
    const productWithQuantityToDecrease = state[payload];
    if (!productWithQuantityToDecrease) {
      return state;
    }

    let quantity = productWithQuantityToDecrease.quantity;

    if (quantity <= 1) {
      return omit(state, [payload]);
    }

    quantity--;
    return {
      ...state,
      [payload]: { product: productWithQuantityToDecrease.product, quantity },
    };
  })
  .handleAction(cartActions.cleanCartAction, () => {
    return initialState;
  });

export default reducer;
