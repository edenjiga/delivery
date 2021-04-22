import { SocketEmittersModule } from '@/SocketEmitter';
import { Module } from '@nestjs/common';
import { NatsListenerController } from './NatsListeners.controller';

@Module({
  imports: [SocketEmittersModule],
  controllers: [NatsListenerController],
  providers: [],
})
export class NatsListenersModule {}
