import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SettingsUseCases } from '@/useCases';
import { JwtAdminAuthGuard } from '@/auth/guards/jwt-admin-auth.guard';

@Controller('settings')
export class SettingsController {
  constructor(private settingsUseCases: SettingsUseCases) {}

  @Get('')
  public getSetting() {
    return this.settingsUseCases.getSettings();
  }

  @UseGuards(JwtAdminAuthGuard)
  @HttpCode(200)
  @Post('isStoreOpen')
  /**
   * setIsStoreOpen
   */
  public setIsStoreOpen(@Body() body) {
    return this.settingsUseCases.setIsStoreOpen(body);
  }
}
