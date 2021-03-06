import * as cartActions from "@/store/actions/cart";
import reducer from "./cart";
import { product } from "@/__test/data/product";
import { ICartState } from "@/types";
describe("cart reducer", () => {
  describe(`handle ${cartActions.addProductAction}`, () => {
    it("should add the product to the state if the product is not in the state", () => {
      const action = cartActions.addProductAction(product);

      expect(reducer({}, action)).toEqual({
        [product._id]: { product, quantity: 1 },
      });
    });

    it("should add 1 to quantity if the product is already in the state", () => {
      const action = cartActions.addProductAction(product);

      const initialState: ICartState = {
        [product._id]: {
          quantity: 3,
          product,
        },
      };

      expect(reducer(initialState, action)).toEqual({
        [product._id]: {
          product,
          quantity: initialState[product._id].quantity + 1,
        },
      });
    });
  });

  describe(`handle ${cartActions.decreaseProductAction}`, () => {
    it("should return the state if the product is not in the state", () => {
      const action = cartActions.decreaseProductAction(product._id);
      expect(reducer({}, action)).toEqual({});
    });

    it("should substract 1 to quantity if the product is in the state and quantity is grater that 1", () => {
      const action = cartActions.decreaseProductAction(product._id);
      const initialState: ICartState = {
        [product._id]: {
          quantity: 3,
          product,
        },
      };

      expect(reducer(initialState, action)).toEqual({
        [product._id]: {
          product,
          quantity: initialState[product._id].quantity - 1,
        },
      });
    });

    it("should delete the product in the state if the quantity is equal to 1", () => {
      const action = cartActions.decreaseProductAction(product._id);
      const initialState: ICartState = {
        [product._id]: {
          quantity: 1,
          product,
        },
      };
      expect(reducer(initialState, action)).toEqual({});
    });
  });
});
