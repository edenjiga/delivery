import { Injectable } from '@nestjs/common';
import { daysSchedules } from '@edenjiga/delivery-common';
import { SettingsRepository } from '@/data/repository/settings.respository';
@Injectable()
export class SettingsService {
  constructor(private settingsRepository: SettingsRepository) {}

  getDeliveryValue(): number {
    return 3000;
  }

  public async isStoreOpen(): Promise<boolean> {
    const date = new Date();

    const dateMilitarTime = date.getHours() * 100 + date.getMinutes();
    const day = date.getDay();
    const daySchedule = daysSchedules[day];

    const result = await this.settingsRepository.getMobileAppStayOpen();
    return (
      result ||
      daySchedule.some(
        ({ openHour, closeHour }) =>
          dateMilitarTime >= openHour && dateMilitarTime < closeHour,
      )
    );
  }

  async setMobileAppStayOpen(mobileAppStayOpen: string) {
    return this.settingsRepository.setMobileAppStayOpen(mobileAppStayOpen);
  }
}
