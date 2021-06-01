import {
  Controller,
  Post,
  Body,
  Patch,
  UseGuards,
  Req,
  Get,
} from '@nestjs/common';
import { JwtAuthGuard } from '@/auth';
import { UsersUseCases } from '@/useCases';

import { IUserDoc } from '@/models';
import { CreateUserDto } from '@/shared/entities/users';

@Controller('users')
export class UserController {
  constructor(private UsersUseCases: UsersUseCases) {}

  @Post('')
  public saveUser(@Body() body: CreateUserDto) {
    return this.UsersUseCases.createUser(body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('')
  public updateUser(@Req() req) {
    const { user, body }: { user: IUserDoc; body: any } = req;
    return this.UsersUseCases.updateUser(user._id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  public me(@Req() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me/creditCards')
  public usercreditCards(@Req() req) {
    const { user } = req;
    return this.UsersUseCases.getUsercreditCards(user._id);
  }

  @Post('/update-password')
  @UseGuards(JwtAuthGuard)
  public updatePassword(@Req() req) {
    const { user, body } = req;
    return this.UsersUseCases.updatePassword(user, body);
  }
}
