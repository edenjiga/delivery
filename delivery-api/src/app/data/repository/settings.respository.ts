import { Injectable } from '@nestjs/common';
import { RedisService } from './redis';

const redisKeys = {
  MobileAppStayOpen: 'MobileAppStayOpen',
};

@Injectable()
export class SettingsRepository {
  constructor(private redisService: RedisService) {}
  async getMobileAppStayOpen() {
    const mobileAppStayOpen = await this.redisService.get(
      redisKeys.MobileAppStayOpen,
    );

    return mobileAppStayOpen === 'true';
  }
}
