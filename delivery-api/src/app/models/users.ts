import { Schema, Document } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import * as _ from 'lodash';
import { USER_ROLES } from '@/constants';
import {
  CREDIT_CARD_STATUS,
  UserPublicFields,
} from '@edenjiga/delivery-common';

export interface IUserDoc extends Omit<UserPublicFields, '_id'>, Document {}

const creditCardSchema = new Schema({
  name: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  paymentSourceId: {
    required: true,
    type: String,
  },
  status: {
    type: String,
    enum: Object.values(CREDIT_CARD_STATUS),
    default: CREDIT_CARD_STATUS.UNVERIFIED,
  },
});

const addressSchema = new Schema({
  name: String,
  note: { type: String, required: true },
  nomenclature: { type: String, required: true },
  coordinates: {
    required: true,
    type: new Schema({
      longitude: { type: String, required: true },
      latitude: { type: String, required: true },
    }),
  },
});

const UsersSchema = new Schema(
  {
    address: {
      default: [],
      type: [addressSchema],
    },
    code: { type: String, maxlength: 4 },
    email: {
      type: String,
      unique: true,
      sparse: true,
      validate: [isEmail, 'invalid email'],
    },
    name: String,
    phone: { type: String, unique: true, sparse: true },
    identification: { type: String, unique: true, sparse: true },
    password: String,
    roles: {
      type: [],
      default: [USER_ROLES.DEFAULT],
    },
    creditCards: {
      default: [],
      type: [creditCardSchema],
    },
    token: String,
  },
  { timestamps: true },
);

UsersSchema.methods.toJSON = function () {
  const userObject = this.toObject();

  return _.omit(userObject, ['password']);
};

export { UsersSchema };
