import { Injectable } from '@nestjs/common';
import { AuthService, SmsService, UsersService } from '@/services';
import { AuthBadEmailOrPassword } from '@/shared';

interface IVerifySmsInput {
  phone: string;
  code: string;
}

@Injectable()
export class AuthUseCases {
  constructor(
    private authService: AuthService,
    private smsService: SmsService,
    private usersService: UsersService,
  ) {}
  public async loginWithSms(phone: string) {
    let code: string;

    // to test the app in production
    if (phone === '3000000000') {
      code = '000000';
    } else {
      code = this.smsService.generateRandomNumer();
    }

    await this.usersService.createOrUpdateUserByPhone(phone, {
      phone,
      code,
    });

    if (phone !== '3000000000') {
      await this.smsService.sendSms(phone, code);
    }
    return code;
  }

  public async loginWithEmail({ email, password = '' }) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new AuthBadEmailOrPassword();
    }

    await this.authService.checkPasswords(password, user.password);

    const token = await this.authService.generateAuthToken(user);

    return { user, token };
  }

  public async verifySmsCode(input: IVerifySmsInput): Promise<any> {
    const { phone, code } = input;
    const user = await this.usersService.findUserByPhone(phone);

    //TODO: verify if user exist
    await this.smsService.verifyAccessCode(user, code);

    const token = await this.authService.generateAuthToken(user);

    return { user, token };
  }
}
