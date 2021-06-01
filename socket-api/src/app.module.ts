import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { NatsListenersModule } from './NatsListeners';
import { SocketSubscribersModule } from './socketSubcribers/socketSubcribers.module';

@Module({
  imports: [NatsListenersModule, SocketSubscribersModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
