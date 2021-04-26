import { Controller, Get } from '@nestjs/common';
import { SettingsUseCases } from '@/useCases';

@Controller('settings')
export class SettingsController {
  constructor(private settingsUseCases: SettingsUseCases) {}

  @Get('')
  public getSetting() {
    return this.settingsUseCases.getSettings();
  }
}
