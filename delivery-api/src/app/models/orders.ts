import { Schema, Document } from 'mongoose';
import { MODEL_NAMES, ORDER_STATUS, PAYMENT_STATUS } from '@/constants';
import modelNames from '@/constants/modelNames';
import { IOrder } from '@/shared';
import { PAYMENT_METHODS } from '@edenjiga/delivery-common';

export interface IOrderDoc extends IOrder, Document {}

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

export { OrdersSchema };
