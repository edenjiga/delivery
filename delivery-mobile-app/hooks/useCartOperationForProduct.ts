import { RootState } from "@/store";
import { addProductAction, decreaseProductAction } from "@/store/actions/cart";
import { ProductWithQuantity } from "@/types";
import { Product } from "@edenjiga/delivery-common";
import { useDispatch, useSelector } from "react-redux";

const useCartOperationForProduct = (product: Product) => {
  const dispatch = useDispatch();
  const productWithQuantity = useSelector<RootState, ProductWithQuantity>(
    (state) => state.cart[product._id]
  );

  const { quantity = 0 } = productWithQuantity || {};

  const addProduct = () => dispatch(addProductAction(product));

  const decreaseProduct = () => dispatch(decreaseProductAction(product._id));

  return { addProduct, quantity, decreaseProduct };
};

export default useCartOperationForProduct;
