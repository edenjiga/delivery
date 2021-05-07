import * as request from 'supertest';
import { Test } from '@nestjs/testing';

import { AppModule } from '@/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Publisher } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import {
  daysSchedules,
  SettingMobileAppStayUpdatedEvent,
  USER_ROLES,
} from '@edenjiga/delivery-common';
import { RedisService } from '@/data/repository/redis';

describe('Setting controllers', () => {
  let app: INestApplication;

  let redisService: RedisService;

  const subscribe = jest.fn();
  let publisher = {
    emit: jest.fn(() => ({
      subscribe,
    })),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(Publisher) //NatsStreamingTransport inyect Publisher as provider
      .useValue(publisher)
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

  describe('GET /settings', () => {
    describe('isStoreOpen', () => {
      let RealDate = Date.now;
      beforeAll(() => {
        const mockDate = new Date(1619317327490);
        type PatchedGlobal = {
          Date: new (...args: ConstructorParameters<DateConstructor>) => Date;
        };

        jest
          .spyOn(global as PatchedGlobal, 'Date')
          .mockImplementation(() => mockDate);
      });

      afterAll(() => {
        //fix a error date
        global.Date.now = RealDate;
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
          .spyOn(redisService, 'get')
          .mockReturnValue(Promise.resolve('true'));

        const { status, body } = await request(app.getHttpServer()).get(
          '/settings',
        );

        expect(status).toEqual(200);
        expect(body.isStoreOpen).toEqual(true);
      });
    });
  });

  describe('POST /settings/isStoreOpen', () => {
    const URL = '/settings/isStoreOpen';

    it('Return  401 if the user is not authenticated', async () => {
      await request(app.getHttpServer()).post(URL).expect(401);
    });

    it('should return 403 if the user is not a admin', async () => {
      const { token } = await global.createUserAndGenerateJwtToken(app, {
        email: 'email1@email.com',
      });
      const response = await request(app.getHttpServer())
        .post(URL)
        .set(global.createHeaderWithAuthorization(token));

      expect(response.status).toEqual(403);
    });

    it('should set the mobileAppStayOpen to the value sent', async () => {
      jest.spyOn(redisService, 'set').mockReturnValue(Promise.resolve('true'));

      jest.spyOn(publisher, 'emit');

      const { token } = await global.createUserAndGenerateJwtToken(app, {
        roles: [USER_ROLES.ADMIN],
      });

      const body = {
        mobileAppStayOpen: 'true',
      };

      const response = await request(app.getHttpServer())
        .post(URL)
        .set(global.createHeaderWithAuthorization(token))
        .send(body);

      expect(response.status).toEqual(200);
      expect(response.body).toEqual({
        mobileAppStayOpen: body.mobileAppStayOpen,
      });

      expect(redisService.set).toBeCalledWith(
        'MobileAppStayOpen',
        body.mobileAppStayOpen,
      );

      const settingMobileAppStayUpdatedEvent = new SettingMobileAppStayUpdatedEvent(
        true,
      );
      expect(publisher.emit).toBeCalledWith(
        settingMobileAppStayUpdatedEvent.subject,
        settingMobileAppStayUpdatedEvent.data,
      );
    });
  });
});
