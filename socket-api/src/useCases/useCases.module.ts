import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services';

import { SocketHandlerEventsUseCases } from './socketHandleEvent.useCases';

const commonsModule = [
  SocketHandlerEventsUseCases
];
@Module({
  imports: [
    ServicesModule
  ],
  exports: commonsModule,
  providers: commonsModule,
})
export class UseCaseModule {}
