import { UserPublicFields } from "@edenjiga/delivery-common";
import { createAsyncAction } from "typesafe-actions";

export enum types {
  LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST",
  LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS",
  LOGIN_USER_FAIL = "LOGIN_USER_FAIL",
}

// Create the set of async actions
export const loginUserAsync = createAsyncAction(
  types.LOGIN_USER_REQUEST,
  types.LOGIN_USER_SUCCESS,
  types.LOGIN_USER_FAIL
)<any, UserPublicFields, any>();
