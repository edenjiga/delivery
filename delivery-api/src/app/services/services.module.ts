import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SmsService } from './sms.service';
import { ProductsService } from './products.service';
import { UsersService } from './users.service';
import DataModule from '@/data/data.module';
import { OrdersService } from './orders.service';
import { WompiService } from './wompi.service';
import environment from '@/environment';
import { JwtModule } from '@nestjs/jwt';

const commons = [
  AuthService,
  OrdersService,
  ProductsService,
  SmsService,
  UsersService,
  WompiService,
];

@Module({
  imports: [
    DataModule,
    JwtModule.register({
      secret: environment.jwt.secretKey,
      signOptions: { expiresIn: '365d' },
    }),
  ],
  exports: commons,
  providers: commons,
})
export class ServicesModule {}
