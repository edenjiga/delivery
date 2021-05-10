import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersSchema, SuggestionsSchema, UsersSchema } from '@/models';
import environment from '@/environment';
import MODEL_NAMES from '@/constants/modelNames';
import * as MongoPaginateV2 from 'mongoose-paginate-v2';
import * as MongoAutopopulate from 'mongoose-autopopulate';
import { NatsStreamingTransport } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { RedisService } from './redis';

import { OrdersRepository } from './orders.repository';
import { SettingsRepository } from './settings.respository';
import { SuggestionsRepository } from './suggestions.repository';
import { UsersRepository } from './users.repository';

const commonModule = [
  SettingsRepository,
  SuggestionsRepository,
  UsersRepository,
  OrdersRepository,
];
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
      { name: MODEL_NAMES.SUGGESTIONS, schema: SuggestionsSchema },
    ]),
    NatsStreamingTransport.register({
      clientId: environment.nats.clientId,
      clusterId: environment.nats.clusterId,
      connectOptions: {
        url: environment.nats.url,
      },
    }),
  ],
  exports: [...commonModule],
  providers: [...commonModule, RedisService],
})
export class RepositoryModule {}
