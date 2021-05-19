import { updateUser } from '@/api/user';
import { store } from '@/store';
import { loginUserAsync } from '@/store/actions/user';
import { UserPublicFields } from '@edenjiga/delivery-common';
import storageService from './storageService';

const updateUserRequest = async (
  data: UserPublicFields,
): Promise<{ token: string; user: UserPublicFields }> => {
  const response = await updateUser(data);
  await storageService.setToken(response.token);
  store.dispatch(loginUserAsync.success(response.user));

  return response;
};

export { updateUserRequest };
