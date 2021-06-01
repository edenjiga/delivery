import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthUseCases } from '@/useCases';
import { LoginDto } from '@/shared';

@Controller('auth')
export class AuthController {
  constructor(private AuthUseCases: AuthUseCases) {}

  @Post('sms')
  public loginWithSms(@Body('phone') phone: string) {
    return this.AuthUseCases.loginWithSms(phone);
  }

  @Post('sms/verify')
  public verifySms(@Body() body) {
    return this.AuthUseCases.verifySmsCode(body);
  }

  @Post('/login')
  @HttpCode(200)
  public login(@Body() body: LoginDto) {
    return this.AuthUseCases.loginWithEmail(body);
  }
}
