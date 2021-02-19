import { USER_ROLES } from '@/constants';
import { IUser } from '..';

export const isUserAdmin = (user: IUser): boolean =>
  user.roles.includes(USER_ROLES.ADMIN);
