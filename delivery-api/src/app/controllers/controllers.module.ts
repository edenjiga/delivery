import { Module } from '@nestjs/common';
import { UseCaseModule } from '../useCases';

import { AuthController } from './auth.controller';
import { ProductsController } from './products.controller';
import { UserController } from './users.controller';
import { OrdersController } from './orders.controller';
import { SettingsController } from './settings.controller';
import { SuggestionsController } from './suggestions.controller';
import { WompiController } from './wompi.controller';
import { AuthModule } from '@/auth';

@Module({
  imports: [AuthModule, UseCaseModule],
  controllers: [
    AuthController,
    OrdersController,
    ProductsController,
    SettingsController,
    SuggestionsController,
    UserController,
    WompiController,
  ],
})
export class ControllerModule {}
