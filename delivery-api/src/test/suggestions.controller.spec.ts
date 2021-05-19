import * as request from 'supertest';
import { Test } from '@nestjs/testing';

import { AppModule } from '@/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Publisher } from '@nestjs-plugins/nestjs-nats-streaming-transport';

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
});
