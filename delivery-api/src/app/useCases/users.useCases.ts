import { Injectable } from '@nestjs/common';
import { AuthService, UsersService } from '@/services';
import { CreateUserDto } from '@/shared/entities/users';
import { bcrypt } from '@/shared/utils';

@Injectable()
export class UsersUseCases {
  constructor(
    private usersServices: UsersService,
    private authService: AuthService,
  ) {}

  public async createUser(body: CreateUserDto) {
    if (body.password) {
      body.password = await bcrypt.hashPassword(body.password);
    }
    return this.usersServices.createUser(body);
  }

  public getUsercreditCards(_id: string) {
    return this.usersServices.getUserCreditCardsByUserId(_id);
  }

  public async updateUser(userId, body) {
    const user = await this.usersServices.findByIdAndUpdate(userId, body);

    const token = await this.authService.generateAuthToken(user);
    return { user, token };
  }

  // public async updateUserById(id: string, body) {
  //   const user = await this.usersServices.updateUserById(id, body);
  //   const token = this.authService.generateAuthToken(user);
  //   return { user, token };
  // }

  public async updatePassword({ _id }: { _id: string }, data) {
    const { oldPassword, newPassword } = data;
    const user = await this.usersServices.findById(_id);

    await this.authService.checkPasswords(oldPassword, user.password);

    return this.usersServices.updatePassword(_id, newPassword);
  }

  // public subscribeNotifications(id: string) {
  //   return this.pubSub.asyncIterator(`user ${id}`);
  // }
}
