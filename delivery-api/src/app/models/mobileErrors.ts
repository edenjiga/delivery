import { Schema, Document } from 'mongoose';
import * as _ from 'lodash';
import { MobileErrorDto } from '@edenjiga/delivery-common';

export interface IMobileErrorDoc extends MobileErrorDto, Document {}

const MobileErrorsSchema = new Schema(
  {
    data: Object,
    message: String,
    platform: String,
    stackTrace: String,
    userId: String,
  },
  { timestamps: true },
);

export { MobileErrorsSchema };
