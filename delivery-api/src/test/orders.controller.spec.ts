import * as request from 'supertest';
import { Test } from '@nestjs/testing';

import { AppModule } from '@/app.module';
import {
  ForbiddenException,
  HttpService,
  INestApplication,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';

import { SmsService } from '@/services';
import { UserIncompleteError } from '@/shared/errors/user.error';
import { ProductsDataSource } from '@/data';
import {
  BadPriceError,
  CreateOrderDto,
  InvalidPaymentError,
  IPayment,
  IProduct,
  OrderBadStatusUpdateError,
  OrderNotCancellableError,
  OrderNotFoundError,
  ProductOutStockError,
} from '@/shared';

import { Products } from './remote/products';
import {
  ORDER_STATUS,
  PAYMENT_METHODS,
  PAYMENT_STATUS,
  USER_ROLES,
} from '@/constants';
import CREDIT_CARD_STATUS from '@/constants/creditCardStatus';
import { Types } from 'mongoose';
import {
  PaymentError,
  PaymentNotCompletedError,
} from '@/shared/errors/payments.error';
describe('orders controller', () => {
  let app: INestApplication;

  const smsService = {
    generateRandomNumer: jest.fn(),
    sendSms: jest.fn(),
    verifyAccessCode: jest.fn(),
  };

  const productsDataSource: any = {};
  let httpService: HttpService;
  let defaultData;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(SmsService)
      .useValue(smsService)
      .overrideProvider(ProductsDataSource)
      .useValue(productsDataSource)
      .overrideProvider(HttpService)
      .useValue(httpService)
      .compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );
    await app.init();
    httpService = moduleRef.get<HttpService>(HttpService);
  });

  beforeEach(() => {
    productsDataSource.getProducts = jest.fn(() => Promise.resolve(Products));
    productsDataSource.soldProducts = jest.fn();
  });

  describe('GET /orders', () => {
    let ordersCreated;
    beforeEach(async () => {
      const { token } = await global.createUserAndGenerateJwtToken(app, {
        email: 'O1@email.com',
      });

      ordersCreated = await Promise.all([
        global.createOrder(app, token),
        global.createOrder(app, token),
        global.createOrder(app, token),
      ]);
    });
    const URL = '/orders';

    it('Return  401 if the user is not authenticated', async () => {
      await request(app.getHttpServer()).get(URL).expect(401);
    });

    it('should return the user order if the user is not admin', async () => {
      const { token } = await global.createUserAndGenerateJwtToken(app);
      const order = await global.createOrder(app, token);
      const { status, body } = await request(app.getHttpServer())
        .get(URL)
        .set(global.createHeaderWithAuthorization(token));

      expect(status).toEqual(200);
      expect(body).toHaveProperty('totalDocs', 1);
      expect(body.docs[0]).toEqual(order);
      expect(body.docs[0]).toHaveProperty('user');
    });

    it('should return all the order if the user is admin', async () => {
      const { token } = await global.createUserAndGenerateJwtToken(app, {
        roles: [USER_ROLES.ADMIN],
      });
      const { status, body } = await request(app.getHttpServer())
        .get(`${URL}?limit=2`)
        .set(global.createHeaderWithAuthorization(token));

      expect(status).toEqual(200);
      expect(body).toHaveProperty('totalDocs', 3);
      expect(body).toHaveProperty('limit', 2);
    });

    it('should return unfinished orders if the param unfinished is true', async () => {
      const { token } = await global.createUserAndGenerateJwtToken(app, {
        roles: [USER_ROLES.ADMIN],
      });

      await Promise.all([
        ...ordersCreated.map(({ _id }) =>
          request(app.getHttpServer())
            .patch(`${URL}/${_id}`)
            .set(global.createHeaderWithAuthorization(token))
            .send({ status: ORDER_STATUS.CANCELED }),
        ),
        global.createOrder(app, token),
      ]);

      const { status, body } = await request(app.getHttpServer())
        .get(`${URL}?unfinished=true`)
        .set(global.createHeaderWithAuthorization(token));

      expect(status).toEqual(200);
      expect(body).toHaveProperty('totalDocs', 1);
    });
  });

  describe('GET /orders/:id', () => {
    const URL = '/orders';

    it('Return  401 if the user is not authenticated', async () => {
      const id = Types.ObjectId().toHexString();
      await request(app.getHttpServer()).get(`${URL}/${id}`).expect(401);
    });

    it('should return 403 if the user is not the owner of the order', async () => {
      const { token } = await global.createUserAndGenerateJwtToken(app, {
        email: 'email1@email.com',
      });
      const { token: token2 } = await global.createUserAndGenerateJwtToken(app);

      const order = await global.createOrder(app, token2);
      const response = await request(app.getHttpServer())
        .get(`${URL}/${order._id}`)
        .set(global.createHeaderWithAuthorization(token))
        .send({ status: ORDER_STATUS.CANCELED });
      expect(response.status).toEqual(403);
      expect(response.body).toEqual(new ForbiddenException().getResponse());
    });

    it('should return 200 with the order requested', async () => {
      const { token } = await global.createUserAndGenerateJwtToken(app);

      const order = await global.createOrder(app, token);
      const response = await request(app.getHttpServer())
        .get(`${URL}/${order._id}`)
        .set(global.createHeaderWithAuthorization(token));
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(order);
      expect(response.body).toHaveProperty('user');
    });
  });

  describe('POST /orders', () => {
    beforeEach(() => {
      defaultData = {
        products: Products.map(({ _id }) => ({ id: _id, unitsPurchased: 2 })),
        deliveryValue: 3000,
        price:
          Products.reduce(
            (prevValue, { finalPrice }) => prevValue + finalPrice * 2,

            0,
          ) + 3000,
        payment: { paymentMethod: PAYMENT_METHODS.CASH },
        address: {
          name: 'name',
          nomenclature: 'address.nomenclature',
          coordinate: {
            latitude: '-75.444',
            longitude: '14.000',
          },
        },
      };
    });

    it('Return  401 if the user is not authenticated', async () => {
      await request(app.getHttpServer()).post('/orders').expect(401);
    });

    [
      {
        requiredfield: 'products',
        dataSend: [],
      },
      {
        requiredfield: 'price',
        value: undefined,
      },
      {
        requiredfield: 'deliveryValue',
        value: undefined,
      },
      {
        requiredfield: 'payment',
        value: {},
      },
      {
        requiredfield: 'address',
        value: {},
      },
    ].forEach(({ requiredfield, value }) => {
      it(`should return a code 400 if ${requiredfield} is not sent `, async () => {
        const { token } = await global.createUserAndGenerateJwtToken(app);

        const response = await request(app.getHttpServer())
          .post('/orders')
          .set({
            Authorization: `bearer ${token}`,
          })
          .send({ ...defaultData, [requiredfield]: value });

        expect(response.status).toEqual(400);

        expect(response.body.message[0].includes(requiredfield)).toBeTruthy();
      });
    });

    it('should return a 400 if the products array have no unitsPurchased property', async () => {
      const { token } = await global.createUserAndGenerateJwtToken(app);

      const response = await request(app.getHttpServer())
        .post('/orders')
        .set({
          Authorization: `bearer ${token}`,
        })
        .send({
          ...defaultData,
          products: [
            { id: Products[0].id, unitsPurchased: 1 },
            { id: Products[0].id },
          ],
        });

      expect(response.status).toEqual(400);
      expect(response.body.message[0].includes('unitsPurchased')).toBeTruthy();
    });

    it('should return 400 if the user doesnt have identification, email or name', async () => {
      const { token } = await global.createUserAndGenerateJwtToken(app, {
        name: undefined,
        identification: undefined,
        email: undefined,
      });

      const response = await request(app.getHttpServer())
        .post('/orders')
        .set(global.createHeaderWithAuthorization(token))
        .send(defaultData);
      expect(response.status).toBe(400);

      expect(response.body).toEqual(new UserIncompleteError().getResponse());
    });

    it('should return a 400 code if there is not unit disponible', async () => {
      productsDataSource.getProducts = (): Promise<IProduct[]> => {
        return Promise.resolve([
          Products[0],
          { ...Products[1], unitsInStock: 0 },
        ]);
      };

      const { token } = await global.createUserAndGenerateJwtToken(app);
      const response = await request(app.getHttpServer())
        .post('/orders')
        .set(global.createHeaderWithAuthorization(token))
        .send(defaultData);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual(new ProductOutStockError().getResponse());
    });

    it('should return a code 400 if the price is not the correct', async () => {
      const { token } = await global.createUserAndGenerateJwtToken(app);
      const response = await request(app.getHttpServer())
        .post('/orders')
        .set(global.createHeaderWithAuthorization(token))
        .send({ ...defaultData, price: 0 });

      expect(response.status).toEqual(400);
      expect(response.body).toEqual(new BadPriceError().getResponse());
    });

    it(`should return a code 400 if the payment method is ${PAYMENT_METHODS.CREDIT_CARD} but doest not have name or paymentSourceId`, async () => {
      const { token } = await global.createUserAndGenerateJwtToken(app);
      const response = await request(app.getHttpServer())
        .post('/orders')
        .set(global.createHeaderWithAuthorization(token))
        .send({
          ...defaultData,
          payment: {
            paymentMethod: PAYMENT_METHODS.CREDIT_CARD,
          },
        });

      expect(response.status).toEqual(400);
      expect(response.body).toEqual(new InvalidPaymentError().getResponse());
    });

    it(`should return a code 400 if the payment method is ${PAYMENT_METHODS.CREDIT_CARD} and paymentSourceId is declared but doest have name`, async () => {
      const { token } = await global.createUserAndGenerateJwtToken(app);
      const response = await request(app.getHttpServer())
        .post('/orders')
        .set(global.createHeaderWithAuthorization(token))
        .send({
          ...defaultData,
          payment: {
            paymentMethod: PAYMENT_METHODS.CREDIT_CARD,
            creditCard: {
              paymentSourceId: 'paymentSourceId',
              expiresAt: new Date(),
            },
          },
        });

      expect(response.status).toEqual(400);
      expect(response.body).toEqual(new InvalidPaymentError().getResponse());
    });

    it(`should return a code 400 if the payment method is ${PAYMENT_METHODS.CREDIT_CARD} and paymentSourceId is declared but doest have expiresAt`, async () => {
      const { token } = await global.createUserAndGenerateJwtToken(app);
      const response = await request(app.getHttpServer())
        .post('/orders')
        .set(global.createHeaderWithAuthorization(token))
        .send({
          ...defaultData,
          payment: {
            paymentMethod: PAYMENT_METHODS.CREDIT_CARD,
            creditCard: {
              paymentSourceId: 'paymentSourceId',
              name: 'name',
            },
          },
        });

      expect(response.status).toEqual(400);
      expect(response.body).toEqual(new InvalidPaymentError().getResponse());
    });

    describe('code 201', () => {
      describe('payment with creditCard Method', () => {
        beforeEach(() => {
          defaultData.payment.paymentMethod = PAYMENT_METHODS.CREDIT_CARD;
        });

        it('return a order and add a creditCart to user if the paymentSourceId is sent', async () => {
          const { token, user } = await global.createUserAndGenerateJwtToken(
            app,
          );

          const creditCard = {
            name: 'VISA-4242',
            status: CREDIT_CARD_STATUS.ACTIVE,
            paymentSourceId: '123',
            expiresAt: new Date().toJSON(),
          };

          const payment: IPayment = { ...defaultData.payment, creditCard };
          const bodyToSend: CreateOrderDto = { ...defaultData, payment };
          const header = global.createHeaderWithAuthorization(token);
          const { status, body } = await request(app.getHttpServer())
            .post('/orders')
            .set(header)
            .send(bodyToSend);

          // get user credit cards
          const { body: usercreditCards } = await request(app.getHttpServer())
            .get('/users/me/creditCards')
            .set(header);

          expect(usercreditCards[0]).toMatchObject(creditCard);

          expect(status).toEqual(201);
          expect(body).toHaveProperty('_id');

          // check the price
          const discountValue = Products.reduce((prev, { discountValue }) => {
            return prev + discountValue * 2;
          }, 0);

          expect(body).toMatchObject({
            discountValue,
            price: defaultData.price,
            userId: user._id.toString(),
            status: ORDER_STATUS.CREATED,
            productsWithUnit: Products.map((product) => ({
              product,
              unitsPurchased: 2,
            })),
          });
        });

        it('return a order ', async () => {
          const creditCard = {
            name: 'VISA-4242',
            status: CREDIT_CARD_STATUS.ACTIVE,
            paymentSourceId: '123',
            expiresAt: new Date(),
          };

          const { token, user } = await global.createUserAndGenerateJwtToken(
            app,
            {
              creditCards: [creditCard],
            },
          );

          const payment: IPayment = {
            ...defaultData.payment,
            creditCard: { name: creditCard.name },
          };

          const bodyToSend: CreateOrderDto = { ...defaultData, payment };
          const header = global.createHeaderWithAuthorization(token);
          const { status, body } = await request(app.getHttpServer())
            .post('/orders')
            .set(header)
            .send(bodyToSend);

          expect(status).toEqual(201);
          expect(body).toHaveProperty('_id');

          // check the price
          const discountValue = Products.reduce((prev, { discountValue }) => {
            return prev + discountValue * 2;
          }, 0);

          expect(body).toMatchObject({
            discountValue,
            price: defaultData.price,
            userId: user._id.toString(),
            status: ORDER_STATUS.CREATED,
            productsWithUnit: Products.map((product) => ({
              product,
              unitsPurchased: 2,
            })),
            payment: {
              paymentMethod: defaultData.payment.paymentMethod,
              status: PAYMENT_STATUS.NOT_PAID,
              creditCard: {
                name: creditCard.name,
                paymentSourceId: creditCard.paymentSourceId,
              },
            },
          });
        });
      });
    });
  });

  describe('PATCH /orders/id', () => {
    const URL = '/orders';

    beforeEach(() => {
      defaultData = { status: ORDER_STATUS.CREATED };
    });
    it('should return 401 if the user is not authorized', async () => {
      await request(app.getHttpServer()).patch(`${URL}/123`).expect(401);
    });

    it('should return 400 if the status is not sent', async () => {
      const { token } = await global.createUserAndGenerateJwtToken(app);
      const id = Types.ObjectId().toHexString();

      const response = await request(app.getHttpServer())
        .patch(`${URL}/${id}`)
        .set(global.createHeaderWithAuthorization(token))
        .send({});

      expect(response.status).toEqual(400);
      expect(response.body.message[0].includes('status')).toBeTruthy();
    });

    it('should return 404 if the order not exits', async () => {
      const { token } = await global.createUserAndGenerateJwtToken(app);

      const id = Types.ObjectId().toHexString();
      const response = await request(app.getHttpServer())
        .patch(`${URL}/${id}`)
        .set(global.createHeaderWithAuthorization(token))
        .send(defaultData);
      expect(response.status).toEqual(404);
      expect(response.body).toEqual(new OrderNotFoundError().getResponse());
    });

    describe(`update order to status ${ORDER_STATUS.IN_PROGRESS}`, () => {
      beforeEach(() => {
        defaultData = { status: ORDER_STATUS.IN_PROGRESS };
      });

      it('should return 401 if the user is not a admin', async () => {
        const { token } = await global.createUserAndGenerateJwtToken(app);

        const order = await global.createOrder(app, token);
        const response = await request(app.getHttpServer())
          .patch(`${URL}/${order._id}`)
          .set(global.createHeaderWithAuthorization(token))
          .send(defaultData);
        expect(response.status).toEqual(401);
        expect(response.body).toEqual(
          new UnauthorizedException().getResponse(),
        );
      });

      it(`should return 400 if the order status is not ${ORDER_STATUS.CREATED} `, async () => {
        const { token } = await global.createUserAndGenerateJwtToken(app, {
          roles: [USER_ROLES.ADMIN],
        });

        const order = await global.createOrder(app, token);
        await request(app.getHttpServer())
          .patch(`${URL}/${order._id}`)
          .set(global.createHeaderWithAuthorization(token))
          .send(defaultData);

        const response = await request(app.getHttpServer())
          .patch(`${URL}/${order._id}`)
          .set(global.createHeaderWithAuthorization(token))
          .send(defaultData);
        expect(response.status).toEqual(400);
        expect(response.body).toEqual(
          new OrderBadStatusUpdateError().getResponse(),
        );
      });

      it(`should return 200 and update the order status to ${ORDER_STATUS.IN_PROGRESS}`, async () => {
        const { token } = await global.createUserAndGenerateJwtToken(app, {
          roles: [USER_ROLES.ADMIN],
        });

        const order = await global.createOrder(app, token);
        const response = await request(app.getHttpServer())
          .patch(`${URL}/${order._id}`)
          .set(global.createHeaderWithAuthorization(token))
          .send(defaultData);

        expect(response.status).toEqual(200);

        const { body } = await request(app.getHttpServer())
          .get(`${URL}/${order._id}`)
          .set(global.createHeaderWithAuthorization(token));

        expect(body.status).toEqual(ORDER_STATUS.IN_PROGRESS);
      });

      it(`should return 400 with payment Error if the status return by submit pay is not ${PAYMENT_STATUS.PENDING}`, async () => {
        httpService.post = jest.fn().mockReturnValue({
          toPromise: jest.fn().mockReturnValue({
            data: { data: { status: 'some status' } },
          }),
        });
        const { token } = await global.createUserAndGenerateJwtToken(app, {
          roles: [USER_ROLES.ADMIN],
        });

        const order = await global.createOrder(app, token, {
          payment: {
            paymentMethod: PAYMENT_METHODS.CREDIT_CARD,
            status: PAYMENT_STATUS.NOT_PAID,
            creditCard: {
              name: 'name',
              paymentSourceId: '1',
              expiresAt: new Date(),
              status: CREDIT_CARD_STATUS.ACTIVE,
            },
          },
        });

        const response = await request(app.getHttpServer())
          .patch(`${URL}/${order._id}`)
          .set(global.createHeaderWithAuthorization(token))
          .send(defaultData);

        expect(response.status).toEqual(400);
        expect(response.body).toEqual(new PaymentError().getResponse());
      });

      it(`should return 200, update the order payment status to ${PAYMENT_STATUS.PENDING} and update the order status to ${ORDER_STATUS.IN_PROGRESS}`, async () => {
        httpService.post = jest.fn().mockReturnValue({
          toPromise: jest.fn().mockReturnValue({
            data: { data: { status: PAYMENT_STATUS.PENDING } },
          }),
        });
        const { token } = await global.createUserAndGenerateJwtToken(app, {
          roles: [USER_ROLES.ADMIN],
        });

        const order = await global.createOrder(app, token, {
          payment: {
            paymentMethod: PAYMENT_METHODS.CREDIT_CARD,
            status: PAYMENT_STATUS.NOT_PAID,
            creditCard: {
              name: 'name',
              paymentSourceId: '1',
              expiresAt: new Date(),
              status: CREDIT_CARD_STATUS.ACTIVE,
            },
          },
        });

        const response = await request(app.getHttpServer())
          .patch(`${URL}/${order._id}`)
          .set(global.createHeaderWithAuthorization(token))
          .send(defaultData);

        expect(response.status).toEqual(200);

        const { body } = await request(app.getHttpServer())
          .get(`${URL}/${order._id}`)
          .set(global.createHeaderWithAuthorization(token));

        expect(body.status).toEqual(ORDER_STATUS.IN_PROGRESS);
        expect(body.payment.status).toEqual(PAYMENT_STATUS.PENDING);
      });
    });

    describe(`update order to status ${ORDER_STATUS.COMPLETED}`, () => {
      beforeEach(() => {
        defaultData = { status: ORDER_STATUS.COMPLETED };
        httpService.post = jest.fn().mockReturnValue({
          toPromise: jest.fn().mockReturnValue({
            data: { data: { status: PAYMENT_STATUS.PENDING } },
          }),
        });
      });

      it('should return 401 if the user is not a admin', async () => {
        const { token } = await global.createUserAndGenerateJwtToken(app);

        const order = await global.createOrder(app, token);
        const response = await request(app.getHttpServer())
          .patch(`${URL}/${order._id}`)
          .set(global.createHeaderWithAuthorization(token))
          .send(defaultData);
        expect(response.status).toEqual(401);
        expect(response.body).toEqual(
          new UnauthorizedException().getResponse(),
        );
      });

      it(`should return 400 if the order status is not ${ORDER_STATUS.IN_PROGRESS} `, async () => {
        const { token } = await global.createUserAndGenerateJwtToken(app, {
          roles: [USER_ROLES.ADMIN],
        });

        const order = await global.createOrder(app, token);

        const response = await request(app.getHttpServer())
          .patch(`${URL}/${order._id}`)
          .set(global.createHeaderWithAuthorization(token))
          .send(defaultData);

        expect(response.status).toEqual(400);
        expect(response.body).toEqual(
          new OrderBadStatusUpdateError().getResponse(),
        );
      });

      it(`should return 400 if the payment methos is ${PAYMENT_METHODS.CREDIT_CARD} and payment.status is not ${PAYMENT_STATUS.APPROVED}`, async () => {
        const { token } = await global.createUserAndGenerateJwtToken(app, {
          roles: [USER_ROLES.ADMIN],
        });

        const order = await global.createOrder(app, token, {
          payment: {
            paymentMethod: PAYMENT_METHODS.CREDIT_CARD,
            status: PAYMENT_STATUS.NOT_PAID,
            creditCard: {
              name: 'name',
              paymentSourceId: '1',
              expiresAt: new Date(),
              status: CREDIT_CARD_STATUS.ACTIVE,
            },
          },
        });

        await request(app.getHttpServer())
          .patch(`${URL}/${order._id}`)
          .set(global.createHeaderWithAuthorization(token))
          .send({ defaultData, status: ORDER_STATUS.IN_PROGRESS });

        const response = await request(app.getHttpServer())
          .patch(`${URL}/${order._id}`)
          .set(global.createHeaderWithAuthorization(token))
          .send(defaultData);
        expect(response.status).toEqual(400);
        expect(response.body).toEqual(
          new PaymentNotCompletedError().getResponse(),
        );
      });

      it(`should return 200, update the order payment status to ${PAYMENT_STATUS.APPROVED} and update the order status to ${ORDER_STATUS.COMPLETED}`, async () => {
        const { token } = await global.createUserAndGenerateJwtToken(app, {
          roles: [USER_ROLES.ADMIN],
        });

        const order = await global.createOrder(app, token);

        await request(app.getHttpServer())
          .patch(`${URL}/${order._id}`)
          .set(global.createHeaderWithAuthorization(token))
          .send({ defaultData, status: ORDER_STATUS.IN_PROGRESS });

        const response = await request(app.getHttpServer())
          .patch(`${URL}/${order._id}`)
          .set(global.createHeaderWithAuthorization(token))
          .send(defaultData);

        expect(response.status).toEqual(200);

        expect(productsDataSource.soldProducts).toHaveBeenCalled();

        const { body } = await request(app.getHttpServer())
          .get(`${URL}/${order._id}`)
          .set(global.createHeaderWithAuthorization(token));

        expect(body.status).toEqual(ORDER_STATUS.COMPLETED);
        expect(body.payment.status).toEqual(PAYMENT_STATUS.APPROVED);
      });
    });

    describe(`update order to status ${ORDER_STATUS.CANCELED}`, () => {
      beforeEach(() => {
        defaultData = { status: ORDER_STATUS.CANCELED };
      });

      it('should return 401 if the order is not belongs to the user', async () => {
        const { token } = await global.createUserAndGenerateJwtToken(app, {
          email: 'email1@email.com',
        });
        const { token: token2 } = await global.createUserAndGenerateJwtToken(
          app,
        );

        const order = await global.createOrder(app, token2);
        const response = await request(app.getHttpServer())
          .patch(`${URL}/${order._id}`)
          .set(global.createHeaderWithAuthorization(token))
          .send({ status: ORDER_STATUS.CANCELED });
        expect(response.status).toEqual(401);
        expect(response.body).toEqual(
          new UnauthorizedException().getResponse(),
        );
      });

      it(`should return 400 if the user is not admin and the order status is not equal to ${ORDER_STATUS.CREATED}`, async () => {
        const {
          token: adminToken,
        } = await global.createUserAndGenerateJwtToken(app, {
          roles: [USER_ROLES.ADMIN],
          email: 'admin@admin.com',
        });

        const { token } = await global.createUserAndGenerateJwtToken(app);
        const order = await global.createOrder(app, token);

        // put order in Process
        await request(app.getHttpServer())
          .patch(`${URL}/${order._id}`)
          .set(global.createHeaderWithAuthorization(adminToken))
          .send({ status: ORDER_STATUS.IN_PROGRESS });

        const response = await request(app.getHttpServer())
          .patch(`${URL}/${order._id}`)
          .set(global.createHeaderWithAuthorization(token))
          .send({ status: ORDER_STATUS.CANCELED });

        expect(response.status).toEqual(400);
        expect(response.body).toEqual(
          new OrderNotCancellableError().getResponse(),
        );
      });

      it(`should return code 200 and put the order in cancel status `, async () => {
        const { token } = await global.createUserAndGenerateJwtToken(app);

        const order = await global.createOrder(app, token);
        const response = await request(app.getHttpServer())
          .patch(`${URL}/${order._id}`)
          .set(global.createHeaderWithAuthorization(token))
          .send(defaultData);

        expect(response.status).toEqual(200);

        const { body } = await request(app.getHttpServer())
          .get(`${URL}/${order._id}`)
          .set(global.createHeaderWithAuthorization(token));

        expect(body.status).toEqual(ORDER_STATUS.CANCELED);
      });

      it(`should return code 200 and update the order if the user is admin`, async () => {
        const {
          token: adminToken,
        } = await global.createUserAndGenerateJwtToken(app, {
          roles: [USER_ROLES.ADMIN],
          email: 'admin@admin.com',
        });

        const { token } = await global.createUserAndGenerateJwtToken(app);
        const order = await global.createOrder(app, token);

        const response = await request(app.getHttpServer())
          .patch(`${URL}/${order._id}`)
          .set(global.createHeaderWithAuthorization(adminToken))
          .send(defaultData);

        expect(response.status).toEqual(200);

        const { body } = await request(app.getHttpServer())
          .get(`${URL}/${order._id}`)
          .set(global.createHeaderWithAuthorization(token));

        expect(body.status).toEqual(ORDER_STATUS.CANCELED);
      });
    });
  });
});
