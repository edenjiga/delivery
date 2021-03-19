import { UserPublicFields } from "@edenjiga/delivery-common";
import mainApi from "./mainApi";

const getUserByToken = () => mainApi.get<UserPublicFields>("/users/me");

const updateUser = (data: UserPublicFields) =>
  mainApi.patch<{
    token: string;
    user: UserPublicFields;
  }>("/users", { body: data });

export { getUserByToken, updateUser };
