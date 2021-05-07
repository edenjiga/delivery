import { SettingsService } from '@/services';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SettingsUseCases {
  constructor(private settingsService: SettingsService) {}

  async setIsStoreOpen(body: { mobileAppStayOpen: string }) {
    await this.settingsService.setMobileAppStayOpen(body.mobileAppStayOpen);
    return body;
  }

  public async getSettings() {
    const isStoreOpen = await this.settingsService.isStoreOpen();
    return { isStoreOpen };
  }
}
