import { Module } from '@nestjs/common';
import { UseCaseModule } from 'src/useCases/useCases.module';
import { SocketEmitterBase } from './SocketEmitterBase';

const commons = [SocketEmitterBase];

@Module({
  imports: [UseCaseModule],
  providers: commons,
  exports: commons,
})
export class SocketEmittersModule {}
