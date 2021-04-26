import { Module } from '@nestjs/common';

import { ServicesModule } from '../services';

import { AuthUseCases } from './auth.useCases';
import { OrdersUseCases } from './orders.useCases';
import { ProductsUseCases } from './products.useCases';
import { SettingsUseCases } from './settings.useCases';
import { UsersUseCases } from './users.useCases';
import { WompiUseCases } from './wompi.useCases';

const commonsModule = [
  AuthUseCases,
  OrdersUseCases,
  SettingsUseCases,
  ProductsUseCases,
  UsersUseCases,
  WompiUseCases,
];
@Module({
  imports: [ServicesModule],
  exports: commonsModule,
  providers: commonsModule,
})
export class UseCaseModule {}
