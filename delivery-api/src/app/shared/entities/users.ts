import { IsEmail, IsOptional, IsString } from 'class-validator';
import { UserPublicFields } from '@edenjiga/delivery-common';

export class CreateUserDto {
  @IsOptional()
  readonly identification: UserPublicFields['identification'];
  @IsOptional()
  readonly phone: UserPublicFields['phone'];

  @IsOptional()
  @IsEmail()
  readonly email: UserPublicFields['email'];

  @IsOptional()
  @IsString()
  password: UserPublicFields['password'];

  readonly roles: [string];
}

export class IPatchUserDto {
  @IsOptional()
  readonly identification: UserPublicFields['identification'];
  @IsOptional()
  readonly phone: UserPublicFields['phone'];
  @IsOptional()
  readonly name: UserPublicFields['name'];

  @IsOptional()
  readonly address: UserPublicFields['address'];
}
