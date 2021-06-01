import * as request from 'supertest';
import { Test } from '@nestjs/testing';

import { AppModule } from '@/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AuthBadEmailOrPassword } from '@/shared';
import { Publisher } from '@nestjs-plugins/nestjs-nats-streaming-transport';

describe('Auth controllers', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(Publisher) //NatsStreamingTransport inyect Publisher as provider
      .useValue({})
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );
    try {
      await app.init();
    } catch (e) {
      console.error(e);
    }
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /login', () => {
    const URL = '/auth/login';

    it('should return code 400 if the email is not send', async () => {
      const { body, status } = await request(app.getHttpServer())
        .post(URL)
        .send();
      expect(status).toEqual(400);
      expect(body.message[0]).toEqual('email must be an email');
    });

    it('should return 400 if the user doesnt exist', async () => {
      const { body, status } = await request(app.getHttpServer())
        .post(URL)
        .send({
          email: 'email@emai.com',
        });

      expect(status).toEqual(400);
      expect(body).toEqual(new AuthBadEmailOrPassword().getResponse());
    });

    it('should return 400 if the user doesnt exist', async () => {
      const { email } = await global.createUser({ password: 'somepassword' });
      const { body, status } = await request(app.getHttpServer())
        .post(URL)
        .send({
          email,
          password: 'q2132',
        });

      expect(status).toEqual(400);
      expect(body).toEqual(new AuthBadEmailOrPassword().getResponse());
    });

    it('should return a code 200 with token and the user sent if the password sent match', async () => {
      const userBody = { email: 'email@email.com', password: '123456' };

      const { body: createdUser } = await request(app.getHttpServer())
        .post('/users')
        .send(userBody)
        .expect(201);

      const { body, status } = await request(app.getHttpServer())
        .post(URL)
        .send(userBody);

      expect(status).toEqual(200);
      expect(body.token).toBeDefined();
      expect(body.user).toEqual(createdUser);
    });
  });
});
