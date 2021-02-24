import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersSchema, UsersSchema } from '@/models';
import environment from '@/environment';
import MODEL_NAMES from '@/constants/modelNames';
import { UsersRepository } from './users.repository';
import { OrdersRepository } from './orders.repository';
import * as MongoPaginateV2 from 'mongoose-paginate-v2';
import * as MongoAutopopulate from 'mongoose-autopopulate';

const commonModule = [UsersRepository, OrdersRepository];

@Module({
  imports: [
    MongooseModule.forRoot(environment.mongo.url, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectionFactory: (connection) => {
        connection.plugin(MongoAutopopulate);
        connection.plugin(MongoPaginateV2);
        return connection;
      },
    }),
    MongooseModule.forFeature([
      // { name: MODEL_NAMES.PRODUCTS, schema: ProductsSchema },
      // { name: MODEL_NAMES.STORES, schema: StoreSchema },
      { name: MODEL_NAMES.USERS, schema: UsersSchema },
      { name: MODEL_NAMES.ORDERS, schema: OrdersSchema },
    ]),
  ],
  exports: [...commonModule],
  providers: [...commonModule],
})
export class RepositoryModule {}