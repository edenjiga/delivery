import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserDoc } from '@/models';
import { randomBytes } from 'crypto';

import * as bcrypt from 'bcrypt';
import { UsersRepository } from '@/data';
import { AuthBadEmailOrPassword } from '@/shared';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private userRepository: UsersRepository,
  ) {}

  public async generateAuthToken(user: IUserDoc): Promise<string> {
    const { _id, email, identification, name, phone, roles } = user;

    const token = randomBytes(156).toString('hex');

    const payload = {
      _id,
      email,
      identification,
      name,
      phone,
      roles,
      token,
    };

    await this.userRepository.findByIdAndUpdate(_id, { token });

    return this.jwtService.sign(payload);
  }

  public async checkPasswords(password1, password2) {
    const check = await bcrypt.compare(password1, password2);

    if (!check) {
      throw new AuthBadEmailOrPassword();
    }
  }
}
