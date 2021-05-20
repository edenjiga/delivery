import { MODEL_NAMES } from '@/constants';
import { IOrderDoc } from '@/models';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersRepository } from './users.repository';
import {
  OrderCreatedNatsEvent,
  OrderUpdatedNatsEvent,
} from '@edenjiga/delivery-common';

import { Publisher } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { checkField } from '@/shared/utils/checkField';

interface IOrderModel extends Model<IOrderDoc> {
  paginate(query, options): Promise<any>;
}

const OPERATIONS_TYPES = {
  INSERT: 'insert',
  UPDATE: 'update',
  REPLACE: 'replace',
};

@Injectable()
export class OrdersRepository {
  private logger: Logger = new Logger('OrdersRepository');

  constructor(
    @InjectModel(MODEL_NAMES.ORDERS)
    private orderModel: IOrderModel,
    @InjectModel(MODEL_NAMES.USERS)
    private userRepository: UsersRepository,
    private publisher: Publisher,
  ) {}

  findById(orderId: string) {
    return this.orderModel.findById(orderId);
  }

  public async save(data): Promise<IOrderDoc> {
    const order = new this.orderModel(data);
    await order.save();

    if (checkField(order, '_id')) {
      this.publish(new OrderCreatedNatsEvent(order));
    }

    return order;
  }

  public async updateById(id, data): Promise<IOrderDoc> {
    const order = await this.orderModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (checkField(order, '_id')) {
      this.publish(new OrderUpdatedNatsEvent(order));
    }

    return order;
  }

  public paginate(query, options) {
    return this.orderModel.paginate(query, options);
  }

  private publish(orderEvent: OrderCreatedNatsEvent | OrderUpdatedNatsEvent) {
    this.publisher
      .emit(orderEvent.subject, orderEvent.data)
      .subscribe((guid) => {
        console.log('published message with guid:', guid);
      });

    this.logger.log(`${orderEvent.subject} ${orderEvent.data._id}`);
  }
}
