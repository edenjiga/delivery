import { Schema, Document } from 'mongoose';
import { MODEL_NAMES } from '@/constants';
import modelNames from '@/constants/modelNames';
import {
  IOrder,
  ORDER_STATUS,
  PAYMENT_METHODS,
  PAYMENT_STATUS,
} from '@edenjiga/delivery-common';

export interface IOrderDoc extends Omit<IOrder, '_id'>, Document {}

const OrdersSchema = new Schema(
  {
    deliveryDate: {
      type: Date,
    },
    deliveryValue: {
      type: Number,
      required: true,
    },
    discountValue: {
      type: Number,
      default: 0,
    },
    payment: {
      status: {
        enum: Object.values(PAYMENT_STATUS),
        type: String,
        default: PAYMENT_STATUS.NOT_PAID,
      },
      paymentMethod: {
        enum: Object.values(PAYMENT_METHODS),
        type: String,
        required: true,
      },
      creditCard: {
        name: String,
        paymentSourceId: String,
      },
    },
    productsWithUnit: {
      type: [
        {
          unitsPurchased: {
            type: Number,
            required: true,
          },
          product: {},
        },
      ],
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(ORDER_STATUS),
      default: ORDER_STATUS.CREATED,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: modelNames.USERS,
      required: true,
    },
    address: {
      type: {
        name: String,
        note: String,
        nomenclature: String,
        coordinates: {
          longitude: String,
          latitude: String,
        },
      },
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

OrdersSchema.virtual('user', {
  ref: MODEL_NAMES.USERS,
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
  autopopulate: true,
});

OrdersSchema.index({ userId: 1, status: 1 });
export { OrdersSchema };
