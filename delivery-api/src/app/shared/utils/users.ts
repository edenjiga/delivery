import { USER_ROLES } from '@/constants';
import { IUserDoc } from '@/models';

export const isUserAdmin = (user: IUserDoc): boolean =>
  user.roles.includes(USER_ROLES.ADMIN);
