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
  ) {
    if (process.env.NODE_ENV === 'test') return;

    const changeStream = this.orderModel.watch([], {
      fullDocument: 'updateLookup',
    });

    changeStream.on('change', async (event: any) => {
      try {
        const { fullDocument, operationType } = event;
        const user = await this.userRepository.findById(fullDocument.userId);

        let orderEvent;
        const order = { ...fullDocument, user };

        switch (operationType) {
          case OPERATIONS_TYPES.INSERT:
            orderEvent = new OrderCreatedNatsEvent(order);
            break;
          case OPERATIONS_TYPES.UPDATE:
          case OPERATIONS_TYPES.REPLACE:
            orderEvent = new OrderUpdatedNatsEvent(order);

            break;
          default:
            this.logger.warn(
              `Unhandle mongo order operationType ${operationType}`,
            );
        }

        this.publisher
          .emit(orderEvent.subject, orderEvent.data)
          .subscribe((guid) => {
            console.log('published message with guid:', guid);
          });
        this.logger.log(`${orderEvent} ${order._id}`);
      } catch (error) {
        this.logger.error(error);
      }
    });

    //Error
    changeStream.on('error', (error) => {
      this.logger.error(error);
    });
  }

  findById(orderId: string) {
    return this.orderModel.findById(orderId);
  }

  public save(data) {
    const order = new this.orderModel(data);
    return order.save();
  }

  public updateById(id, data) {
    return this.orderModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  public paginate(query, options) {
    return this.orderModel.paginate(query, options);
  }
}
