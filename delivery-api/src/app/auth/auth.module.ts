import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersService } from '@/services';
import DataModule from '@/data';
@Module({
  imports: [PassportModule, DataModule],
  providers: [UsersService, JwtStrategy],
})
export class AuthModule {}
