import { UserPublicFields } from "@edenjiga/delivery-common";
import mainApi from "./mainApi";

const sendSms = (phone: string) =>
  mainApi.post<string>("/auth/sms", {
    body: { phone },
  });

const verifySmsCode = (body: { phone: string; code: string }) =>
  mainApi.post<{
    token: string;
    user: UserPublicFields;
  }>("/auth/sms/verify", {
    body,
  });

export { sendSms, verifySmsCode };
