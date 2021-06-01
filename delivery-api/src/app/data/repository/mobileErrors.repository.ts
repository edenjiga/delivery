import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MODEL_NAMES } from '@/constants';
import { Model } from 'mongoose';
import { IMobileErrorDoc } from '@/models/mobileErrors';
import { MobileErrorDto } from '@edenjiga/delivery-common';

@Injectable()
export class MobileErrorsRepository {
  constructor(
    @InjectModel(MODEL_NAMES.MOBILE_ERRORS)
    private mobileErrorModel: Model<IMobileErrorDoc>,
  ) {}

  public save(data: MobileErrorDto) {
    const mobileError = new this.mobileErrorModel(data);
    return mobileError.save();
  }
}
