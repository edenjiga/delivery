import { MobileErrorsRepository } from '@/data';
import { MobileErrorDto } from '@edenjiga/delivery-common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MobileErrorsService {
  constructor(private mobileErrorsRepository: MobileErrorsRepository) {}

  public save(data: MobileErrorDto) {
    return this.mobileErrorsRepository.save(data);
  }
}
