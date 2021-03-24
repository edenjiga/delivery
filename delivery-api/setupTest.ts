/* eslint-disable @typescript-eslint/no-namespace */
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

import modelNames from '@/constants/modelNames';
import { IOrderDoc, IUserDoc } from '@/models';
import { CreateOrderDto } from '@/shared';
import { Products } from './src/test/remote/products';
import { PAYMENT_METHODS, UserPublicFields } from '@edenjiga/delivery-common';

let identification = 0;
declare global {
  namespace NodeJS {
    interface Global {
      createUser(
        user: Omit<UserPublicFields, '_id' | 'address'>,
      ): Promise<IUserDoc>;
      createUserAndGenerateJwtToken(
        app: INestApplication,
        user?: UserPublicFields,
      ): Promise<{ user: IUserDoc; token: string }>;
      createHeaderWithAuthorization(token: string);
      createOrder(
        app: INestApplication,
        token: string,
        order?,
      ): Promise<IOrderDoc>;
      createOrderInDb(order?): Promise<IOrderDoc>;
      createJwt(app: INestApplication, user: IUserDoc): Promise<string>;
    }
  }
}

let mongod: MongoMemoryReplSet;
const port = 27020;
const dbName = 'test';
const MONGO_URL = `mongodb://127.0.0.1:${port}/test?replicaSet=testset`;

process.env.MONGO_URL = MONGO_URL;
process.env.JWT_SECRET_KEY = '123';
process.env.AWS_REGION = 'us-east-1';
process.env.WOMPI_EVENTS_KEY = 'test_events_0WuHl2464dzFxkYjVQWVHRJnVe3i4BeH';
process.env.HASH_SALT = '$2b$10$50i2D8Eb9Zp9X2fj3NWgIu';
beforeAll(async () => {
  try {
    mongod = new MongoMemoryReplSet({
      instanceOpts: [
        {
          port: port,
        },
      ],
      replSet: {
        dbName: dbName,
        storageEngine: 'wiredTiger',
      },
    });
    await mongod.waitUntilRunning();
    const mongoUri = await mongod.getUri();

    await mongoose.connect(mongoUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (e) {
    console.log(e, 'error');
  }
});

beforeEach(async () => {
  //delete element in the collection
  try {
    const collections = await mongoose.connection.db?.collections();
    collections &&
      (await Promise.all(
        collections.map((collection) => collection.deleteMany({})),
      ));
  } catch (err) {
    console.error(err, 'err');
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
}, 100000);

global.createUser = async (user = {}) => {
  const password = await bcrypt.hash('123456', process.env.HASH_SALT);
  const defaultUser: UserPublicFields = {
    phone: Math.round(Math.random() * 99999999999).toString(),
    code: '0000',
    email: 'email@email.com',
    identification: identification.toString(),
    name: 'name',
    password: password,
    ...user,
    address: [],
  };

  identification++;

  await mongoose.connection.db
    .collection(modelNames.USERS)
    .insertOne(defaultUser);

  const newUser = await mongoose.connection.db
    .collection(modelNames.USERS)
    .findOne({
      phone: defaultUser.phone,
    });

  return newUser;
};

global.createUserAndGenerateJwtToken = async (app, user?) => {
  const newUser = await global.createUser(user);
  const response = await request(app.getHttpServer())
    .post('/auth/sms/verify')
    .send({ phone: newUser.phone, code: newUser.code });

  return { token: response.body.token, user: newUser };
};

global.createHeaderWithAuthorization = (token) => ({
  Authorization: `bearer ${token}`,
});

global.createOrder = async (app, token, order?) => {
  const deliveryValue = 3000;
  const defaultOrder: CreateOrderDto = {
    products: Products.map(({ _id }) => ({ id: _id, unitsPurchased: 2 })),
    deliveryValue,
    price:
      Products.reduce(
        (prevValue, { finalPrice }) => prevValue + finalPrice * 2,
        0,
      ) + deliveryValue,
    payment: { paymentMethod: PAYMENT_METHODS.CASH },
    address: {
      name: 'name',
      nomenclature: 'address.nomenclature',
      coordinate: {
        latitude: '-75.444',
        longitude: '14.000',
      },
    },
    ...order,
  };

  const { body } = await request(app.getHttpServer())
    .post('/orders')
    .set(global.createHeaderWithAuthorization(token))
    .send(defaultOrder);

  if ('statusCode' in body) {
    throw new Error(body.message);
  }
  return body;
};

global.createOrderInDb = async (order) => {
  const deliveryValue = 3000;
  const defaultOrder: CreateOrderDto = {
    products: Products.map(({ _id }) => ({ id: _id, unitsPurchased: 2 })),
    deliveryValue,
    price:
      Products.reduce(
        (prevValue, { finalPrice }) => prevValue + finalPrice * 2,
        0,
      ) + deliveryValue,
    payment: { paymentMethod: PAYMENT_METHODS.CASH },
    address: {
      name: 'name',
      nomenclature: 'address.nomenclature',
      coordinate: {
        latitude: '-75.444',
        longitude: '14.000',
      },
    },
    ...order,
  };

  const { ops } = await mongoose.connection.db
    .collection(modelNames.ORDERS)
    .insertOne(defaultOrder);

  const newOrder = await mongoose.connection.db
    .collection(modelNames.ORDERS)
    .findOne({ _id: ops[0]._id });
  return newOrder;
};
