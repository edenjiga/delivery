import { SettingMobileAppStayUpdatedEvent } from '@edenjiga/delivery-common';
import { Publisher } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from './redis';

const redisKeys = {
  MobileAppStayOpen: 'MobileAppStayOpen',
};

@Injectable()
export class SettingsRepository {
  private logger: Logger = new Logger('OrdersRepository');

  constructor(
    private redisService: RedisService,
    private publisher: Publisher,
  ) {}
  async getMobileAppStayOpen() {
    const mobileAppStayOpen = await this.redisService.get(
      redisKeys.MobileAppStayOpen,
    );

    return this.checkTrueString(mobileAppStayOpen);
  }

  async setMobileAppStayOpen(mobileAppStayOpen: string) {
    const response = await this.redisService.set(
      redisKeys.MobileAppStayOpen,
      mobileAppStayOpen,
    );

    const isOpen = this.checkTrueString(mobileAppStayOpen);

    const settingMobileAppStayUpdatedEvent = new SettingMobileAppStayUpdatedEvent(
      isOpen,
    );

    this.publisher
      .emit(
        settingMobileAppStayUpdatedEvent.subject,
        settingMobileAppStayUpdatedEvent.data,
      )
      .subscribe((guid) => {
        console.log('PASO POR AQUI');
        this.logger.log(
          `event: ${settingMobileAppStayUpdatedEvent.subject} published with guid: ${guid}`,
        );
      });

    return response;
  }

  private checkTrueString(value: string): boolean {
    return value === 'true';
  }
}
