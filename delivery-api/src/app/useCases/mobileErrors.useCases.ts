import { MobileErrorsService } from '@/services';
import { MobileErrorDto } from '@edenjiga/delivery-common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MobileErrorsUseCases {
  constructor(private mobileErrorsService: MobileErrorsService) {}

  public async createError(data: MobileErrorDto) {
    return this.mobileErrorsService.save(data);
  }
}
