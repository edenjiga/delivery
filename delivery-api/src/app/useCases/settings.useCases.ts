import { SettingsService } from '@/services';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SettingsUseCases {
  constructor(private settingsService: SettingsService) {}

  public async getSettings() {
    const isStoreOpen = await this.settingsService.isStoreOpen();
    return { isStoreOpen };
  }
}
