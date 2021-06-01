import * as request from 'supertest';
import { Test } from '@nestjs/testing';

import { AppModule } from '@/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Publisher } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { USER_ROLES } from '@/constants';

describe('User Controller', () => {
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

    await app.init();
  });

  describe('POST /suggestions', () => {
    const URL = '/suggestions';
    it('should return code 201, with the suggestion created', async () => {
      const { token } = await global.createUserAndGenerateJwtToken(app);

      const bodyToSend = { text: '123456' };
      const { body } = await request(app.getHttpServer())
        .post(URL)
        .set(global.createHeaderWithAuthorization(token))

        .send(bodyToSend)
        .expect(201);

      expect(body).toHaveProperty('_id');
      expect(body.text).toEqual(bodyToSend.text);
    });

    it(`should return a code 400 if text is not sent `, async () => {
      const { token } = await global.createUserAndGenerateJwtToken(app);

      const response = await request(app.getHttpServer())
        .post(URL)
        .set(global.createHeaderWithAuthorization(token))
        .send({});

      expect(response.status).toEqual(400);
      expect(response.body.message[0].includes('text')).toBeTruthy();
    });
  });

  describe('PATCH /suggestions/:id', () => {
    const URL = '/suggestions';

    it('Return  401 if the user is not authenticated', async () => {
      await request(app.getHttpServer()).patch(`${URL}/123`).expect(401);
    });

    it('should return 403 if the user is not a admin', async () => {
      const { token } = await global.createUserAndGenerateJwtToken(app, {
        email: 'email1@email.com',
      });
      const response = await request(app.getHttpServer())
        .patch(`${URL}/123`)
        .set(global.createHeaderWithAuthorization(token));

      expect(response.status).toEqual(403);
    });

    it('should update the read property', async () => {
      const { token } = await global.createUserAndGenerateJwtToken(app, {
        roles: [USER_ROLES.ADMIN],
      });

      const bodyToSend = { text: '123456' };

      const { body } = await request(app.getHttpServer())
        .post(URL)
        .set(global.createHeaderWithAuthorization(token))
        .send(bodyToSend);

      const read = true;
      const response = await request(app.getHttpServer())
        .patch(`${URL}/${body._id}`)
        .set(global.createHeaderWithAuthorization(token))
        .send({ read });
      expect(response.status).toEqual(200);
      expect(response.body).toHaveProperty('read', read);
    });
  });

  describe('GET  /suggestions', () => {
    const URL = '/suggestions';
    it('should get all the suggestions by the query', async () => {
      const { token } = await global.createUserAndGenerateJwtToken(app, {
        roles: [USER_ROLES.ADMIN],
      });

      for (let index = 0; index < 3; index++) {
        const bodyToSend = { text: index.toString() };

        await request(app.getHttpServer())
          .post(URL)
          .set(global.createHeaderWithAuthorization(token))

          .send(bodyToSend)
          .expect(201);
      }

      const response = await request(app.getHttpServer())
        .get(URL)
        .set(global.createHeaderWithAuthorization(token));
      expect(response.body.totalDocs).toEqual(3);

      const response2 = await request(app.getHttpServer())
        .get(`${URL}?limit=1&text=1`)
        .set(global.createHeaderWithAuthorization(token));

      expect(response2.body.limit).toEqual(1);
      expect(response2.body.docs).toHaveLength(1);
      expect(response2.body.docs[0].text).toEqual('1');
    });
  });
});
