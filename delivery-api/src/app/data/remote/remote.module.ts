import { Module } from '@nestjs/common';
import { SmsDataSource } from './sms.data-source';
import { ProductsDataSource } from './products.data-source';
import { WompiDataSource } from './wompi.data-source';
import { HttpModule } from './http/http.module';
const common = [ProductsDataSource, SmsDataSource, WompiDataSource];

@Module({
  imports: [HttpModule],
  exports: common,
  providers: common,
})
export class RemoteModule {}
