import { Module } from '@nestjs/common';
import { RepositoryModule } from './repository';
import { RemoteModule } from './remote';

@Module({
  imports: [RemoteModule, RepositoryModule],
  exports: [RemoteModule, RepositoryModule],
})
export default class DataModule {}
