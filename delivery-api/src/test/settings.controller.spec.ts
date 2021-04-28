import * as request from 'supertest';
import { Test } from '@nestjs/testing';

import { AppModule } from '@/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Publisher } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { daysSchedules } from '@edenjiga/delivery-common';
import { RedisService } from '@/data/repository/redis';

describe('Setting controllers', () => {
  let app: INestApplication;

  let redisService: RedisService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(Publisher) //NatsStreamingTransport inyect Publisher as provider
      .useValue({})
      .compile();

    redisService = moduleRef.get<RedisService>(RedisService);

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

  describe('isStoreOpen', () => {
    beforeAll(() => {
      const mockDate = new Date(1619317327490);
      type PatchedGlobal = {
        Date: new (...args: ConstructorParameters<DateConstructor>) => Date;
      };

      jest
        .spyOn(global as PatchedGlobal, 'Date')
        .mockImplementation(() => mockDate);
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
      const { status, body } = await request(app.getHttpServer()).get(
        '/settings',
      );
      expect(status).toEqual(200);
      expect(body.isStoreOpen).toEqual(false);
    });

    it('should return propertie isStoreOpen true if getMobileAppStayOpen return true ', async () => {
      daysSchedules['6'] = [
        {
          openHour: 0,
          closeHour: 400,
        },
      ];
      const { status, body } = await request(app.getHttpServer()).get(
        '/settings',
      );
      expect(status).toEqual(200);
      expect(body.isStoreOpen).toEqual(false);
    });

    it('should return propertie isStoreOpen if SettingsRepository return true', async () => {
      jest
        .spyOn(redisService, 'getAsync')
        .mockReturnValue(Promise.resolve('true'));

      const { status, body } = await request(app.getHttpServer()).get(
        '/settings',
      );

      expect(status).toEqual(200);
      expect(body.isStoreOpen).toEqual(true);
    });
  });
});
