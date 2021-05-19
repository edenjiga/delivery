import { Document, Schema } from 'mongoose';
import modelNames from '@/constants/modelNames';
import { MODEL_NAMES } from '@/constants';
import { SuggestionsPublicFields } from '@edenjiga/delivery-common';

export interface ISuggestionsDoc
  extends Omit<SuggestionsPublicFields, '_id'>,
    Document {}

const SuggestionsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: modelNames.USERS,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

SuggestionsSchema.virtual('user', {
  ref: MODEL_NAMES.USERS,
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
  autopopulate: true,
});

export { SuggestionsSchema };
