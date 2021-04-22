import { Module } from '@nestjs/common';
import { NatsListenersModule } from './NatsListeners';
import { SocketSubscribersModule } from './socketSubcribers/socketSubcribers.module';

@Module({
  imports: [NatsListenersModule, SocketSubscribersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
