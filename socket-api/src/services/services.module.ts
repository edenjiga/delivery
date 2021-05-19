import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpModule } from './http/http.module';

const commons = [
  AuthService,
];

@Module({
  imports: [
    HttpModule
  ],
  exports: commons,
  providers: commons,
})
export class ServicesModule {}
