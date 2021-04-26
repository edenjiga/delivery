import * as request from 'supertest';
import { Test } from '@nestjs/testing';

import { AppModule } from '@/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Publisher } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { daysSchedules } from '@edenjiga/delivery-common';

describe('Setting controllers', () => {
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

    // jest.useFakeTimers('modern');
  });

  afterAll(async () => {
    await app.close();
  });

  describe('isStoreOpen', () => {
    beforeAll(() => {
      const mockDate = new Date(1619317327490);
      jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
    });

    it('should return propertie isStoreOpen true if the time is beetween the openHour and closeHour of the day', async () => {
      daysSchedules['6'] = [
        {
          openHour: 0,
          closeHour: 400,
        },
        {
          openHour: 1800,
          closeHour: 2300,
        },
      ];
      const { status, body } = await request(app.getHttpServer()).get(
        '/settings',
      );
      expect(status).toEqual(200);
      expect(body.isStoreOpen).toEqual(true);
    });

    it('should return propertie isStoreOpen false if the time is not beetween the openHour and closeHour of the day', async () => {
      daysSchedules['6'] = [
        {
          openHour: 0,
          closeHour: 400,
        },
      ];
      const mockDate = new Date(1619317327490);
      const { status, body } = await request(app.getHttpServer()).get(
        '/settings',
      );
      expect(status).toEqual(200);
      expect(body.isStoreOpen).toEqual(false);
    });
  });
});
