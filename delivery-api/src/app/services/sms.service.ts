import { Injectable } from '@nestjs/common';
import { SmsDataSource } from '@/data';
import { AuthInvalidTokenError } from '@/shared';
import { UsersService } from './users.service';
import { SendMessagesCommandOutput } from '@aws-sdk/client-pinpoint';

@Injectable()
export class SmsService {
  constructor(
    private smsDataSource: SmsDataSource,
    private userService: UsersService,
  ) {}

  public generateRandomNumer() {
    return (1000 + Math.floor(Math.random() * 899999)).toString();
  }

  public sendSms(
    phone: string,
    code: string,
  ): Promise<SendMessagesCommandOutput> {
    return this.smsDataSource.sendSms(phone, code);
  }

  public async verifyAccessCode(user, code: string) {
    if (user.code !== code) throw new AuthInvalidTokenError();

    await this.userService.createOrUpdateUserByPhone(user.phone, {
      code: '',
    });
  }
}
