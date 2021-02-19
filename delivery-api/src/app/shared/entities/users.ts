import { IsEmail, IsOptional, IsString } from 'class-validator';
import { USER_ROLES } from '@/constants';
import { CreditCard } from '@/shared';

export interface IUser {
  code?: string;
  email?: string;
  identification?: string;
  name?: string;
  phone?: string;
  roles?: [USER_ROLES];
  creditCards?: CreditCard[];
  password?: string;
}

export class CreateUserDto {
  @IsOptional()
  readonly identification: IUser['identification'];
  @IsOptional()
  readonly phone: IUser['phone'];

  @IsOptional()
  @IsEmail()
  readonly email: IUser['email'];

  @IsOptional()
  @IsString()
  password: IUser['password'];

  readonly roles: [string];
}

export class IPatchUserDto {
  @IsOptional()
  readonly identification: IUser['identification'];
  @IsOptional()
  readonly phone: IUser['phone'];
  @IsOptional()
  readonly name: IUser['name'];
}
