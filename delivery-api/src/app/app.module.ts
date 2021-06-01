import { Module } from '@nestjs/common';
import { ControllerModule } from './controllers';
import { AuthModule } from '@/auth';
@Module({
  imports: [AuthModule, ControllerModule],
})
export class AppModule {}
