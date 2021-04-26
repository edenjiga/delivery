import { SettingsService } from '@/services';
import { Injectable } from '@nestjs/common';

interface IVerifySmsInput {
  phone: string;
  code: string;
}

@Injectable()
export class SettingsUseCases {
  constructor(private settingsService: SettingsService) {}

  public getSettings() {
    const isStoreOpen = this.settingsService.isStoreOpen();
    return { isStoreOpen };
  }
}
