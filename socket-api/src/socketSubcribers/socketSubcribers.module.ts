import { Module } from '@nestjs/common';
import { UseCaseModule } from 'src/useCases/useCases.module';
import { AuthorizationGateway } from './authorization.gateway';

@Module({
  imports: [UseCaseModule],
  providers: [AuthorizationGateway],
})
export class SocketSubscribersModule {}
