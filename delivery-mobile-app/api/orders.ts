import { CreateOrderDto, IOrder } from "@edenjiga/delivery-common";
import mainApi from "./mainApi";

const createOrder = (body: CreateOrderDto) =>
  mainApi.post<IOrder>("/orders", {
    body,
  });

export { createOrder };
