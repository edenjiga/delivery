import * as request from 'supertest';
import { Test } from '@nestjs/testing';

import { AppModule } from '@/app.module';
import { INestApplication } from '@nestjs/common';
import CREDIT_CARD_STATUS from '@/constants/creditCardStatus';

describe('User Controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('POST /users', () => {
    const URL = '/users';
    it('should return code 201, if the body sent have password should hashed', async () => {
      const bodyToSend = { email: 'email@email.com', password: '123456' };
      const { body } = await request(app.getHttpServer())
        .post(URL)
        .send(bodyToSend)
        .expect(201);

      expect(body).toHaveProperty('_id');
      expect(body).not.toHaveProperty('password');
      expect(body.email).toEqual(bodyToSend.email);
    });
  });

  describe('GET /users/me', () => {
    it('should return 401 if the authorization is not send', async () => {
      await request(app.getHttpServer()).get('/users/me').expect(401);
    });

    it('should return 401 if the user token is not authorize', async () => {
      const { token, user } = await global.createUserAndGenerateJwtToken(app);

      await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: user.email,
          password: '123456',
        })
        .expect(200);

      await request(app.getHttpServer())
        .get('/users/me')
        .set({
          Authorization: `bearer ${token}`,
        })
        .expect(401);
    });

    it('should return the user data store in the token', async () => {
      const { token, user } = await global.createUserAndGenerateJwtToken(app);
      const response = await request(app.getHttpServer())
        .get('/users/me')
        .set({
          Authorization: `bearer ${token}`,
        })
        .expect(200);

      expect(response.body.phone).toEqual(user.phone);
    });
  });

  describe('PATCH /users', () => {
    it('should return 401 if the user is not autheticated', async () => {
      await request(app.getHttpServer()).patch('/users').expect(401);
    });

    it('should return 200 and return the updated user', async () => {
      const { token } = await global.createUserAndGenerateJwtToken(app);

      const sendBody = {
        identification: '123',
        email: 'test@test.com',
        name: 'name',
      };

      const response = await request(app.getHttpServer())
        .patch('/users')
        .set(global.createHeaderWithAuthorization(token))
        .send(sendBody);

      expect(response.status).toEqual(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toMatchObject(sendBody);

      const { body } = await request(app.getHttpServer())
        .get('/users/me')
        .set(global.createHeaderWithAuthorization(response.body.token));

      expect(body).toMatchObject(sendBody);
    });
  });

  describe('GET /users/me/creditCards', () => {
    const URL = '/users/me/creditCards';
    it('should return 401 if the authorization is not send', async () => {
      await request(app.getHttpServer()).get(URL).expect(401);
    });

    it('should return a code 200 with the user credit cards', async () => {
      const creditCard = {
        name: 'VISA-4242',
        status: CREDIT_CARD_STATUS.ACTIVE,
        paymentSourceId: '123',
        expiresAt: new Date(),
      };
      const { token } = await global.createUserAndGenerateJwtToken(app, {
        creditCards: [creditCard],
      });
      const response = await request(app.getHttpServer())
        .get(URL)
        .set(global.createHeaderWithAuthorization(token));

      expect(response.status).toEqual(200);
      expect(response.body).toEqual([
        { ...creditCard, expiresAt: creditCard.expiresAt.toJSON() },
      ]);
    });
  });
});
