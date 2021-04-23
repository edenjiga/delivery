import { Module } from '@nestjs/common';
import { ControllerModule } from './controllers';
import { AuthModule } from '@/auth';
import { EventsModule } from './events/event.module';
@Module({
  imports: [AuthModule, ControllerModule, EventsModule],
})
export class AppModule {}
