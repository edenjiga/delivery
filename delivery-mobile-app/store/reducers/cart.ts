import { ActionType, createReducer } from 'typesafe-actions';
import * as cartActions from '@/store/actions/cart';
import { ICartState } from '@/types';
import { omit } from 'lodash';

type Action = ActionType<typeof cartActions>;

const initialState: ICartState = {};

const reducer = createReducer<ICartState, Action>(initialState)
  .handleAction(cartActions.addProductAction, (state, action) => {
    const { payload } = action;
    const { product, quantity: oldQuantity = 1 } = payload;
    const { _id } = product;

    let quantity = oldQuantity;
    if (state[_id]) {
      quantity = state[_id].quantity + oldQuantity;
    }

    return {
      ...state,
      [product._id]: {
        quantity,
        product,
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
