import { UserPublicFields } from "@edenjiga/delivery-common";
import { createAction, createAsyncAction } from "typesafe-actions";

export enum types {
  LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST",
  LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS",
  LOGIN_USER_FAIL = "LOGIN_USER_FAIL",
  USER_LOGOUT = "USER_LOGOUT",
}

export const logOut = createAction(types.USER_LOGOUT)();

// Create the set of async actions
export const loginUserAsync = createAsyncAction(
  types.LOGIN_USER_REQUEST,
  types.LOGIN_USER_SUCCESS,
  types.LOGIN_USER_FAIL
)<any, UserPublicFields, any>();
