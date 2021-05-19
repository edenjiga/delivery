import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '@/app.module';
import { INestApplication } from '@nestjs/common';
import { PAYMENT_METHODS, PAYMENT_STATUS } from '@edenjiga/delivery-common';
import { Publisher } from '@nestjs-plugins/nestjs-nats-streaming-transport';

describe('wompi.controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(Publisher) //NatsStreamingTransport inyect Publisher as provider
      .useValue({})
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('POST wompi/events', () => {
    it('should return code 200 if event is not transaction.updated', async () => {
      await request(app.getHttpServer())
        .post('/wompi/events')
        .send({
          event: 'aaaa',
        })
        .expect(200);
    });

    it('should return code 200 if the event is from authorize service and update the order payment status', async () => {
      const { user, token } = await global.createUserAndGenerateJwtToken(app);
      const order = await global.createOrderInDb({
        payment: {
          paymentMethod: PAYMENT_METHODS.CREDIT_CARD,
          status: PAYMENT_STATUS.NOT_PAID,
        },
        userId: user._id,
      });

      const wompiBodyRequest = {
        event: 'transaction.updated',
        data: {
          transaction: {
            id: '13399-1611698592-65239',
            created_at: '2021-01-26T22:03:12.817Z',
            amount_in_cents: 1000000,
            reference: order._id,
            customer_email: 'edenjiga@gmail.com',
            currency: 'COP',
            payment_method_type: 'CARD',
            payment_method: [Object],
            status: 'APPROVED',
            status_message: null,
            shipping_address: null,
            redirect_url: null,
            payment_source_id: 7173,
            payment_link_id: null,
            customer_data: null,
          },
        },
        sent_at: '2021-01-26T22:03:13.387Z',
        timestamp: 1611698593,
        signature: {
          checksum:
            '4312e34dd21abfa7fbf5e3c34281d4187cb6e48d4ae0c4db2cbdb2d05d760c85',
          properties: [
            'transaction.id',
            'transaction.status',
            'transaction.amount_in_cents',
          ],
        },
        environment: 'test',
      };

      await request(app.getHttpServer())
        .post('/wompi/events')
        .send(wompiBodyRequest)
        .expect(200);

      const { body } = await request(app.getHttpServer())
        .get(`/orders/${order._id}`)
        .set(global.createHeaderWithAuthorization(token));
      expect(body.payment.status).toEqual(
        wompiBodyRequest.data.transaction.status,
      );
    });

    it('should return code 401 if the event if from unauthorice service', async () => {
      await request(app.getHttpServer())
        .post('/wompi/events')
        .send({
          event: 'transaction.updated',
          data: {
            transaction: {
              id: '13399-1611698592-65239',
              amount_in_cents: 1000000,
              status: 'APPROVED',
              customer_data: null,
            },
          },
          timestamp: 1611698593,
          signature: {
            checksum:
              '4312e34dd21abfa7fbf5e3c34281d4187cb6e48d4ae0c4db2cbdb2d05d760c86',
            properties: [
              'transaction.id',
              'transaction.status',
              'transaction.amount_in_cents',
            ],
          },
          environment: 'test',
        })
        .expect(401);
    });
  });
});
