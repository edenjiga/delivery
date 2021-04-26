import { Injectable } from '@nestjs/common';
import { daysSchedules } from '@edenjiga/delivery-common';

@Injectable()
export class SettingsService {
  constructor() {}

  public isStoreOpen(): boolean {
    const date = new Date();

    const dateMilitarTime = date.getHours() * 100 + date.getMinutes();
    const day = date.getDay();
    const daySchedule = daysSchedules[day];
    return daySchedule.some(
      ({ openHour, closeHour }) =>
        dateMilitarTime >= openHour && dateMilitarTime < closeHour,
    );
  }
}
