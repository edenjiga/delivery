import { ORDER_STATUS } from '@/constants';
import { OrdersRepository } from '@/data';
import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  /**
   * createOrder
   */
  public createOrder(data) {
    return this.ordersRepository.save(data);
  }

  findById(orderId: string) {
    return this.ordersRepository.findById(orderId);
  }

  updateOrderById(id: string, data) {
    return this.ordersRepository.updateById(id, data);
  }

  paginate(oldQuery: any = {}, options) {
    const defaultOptions = { limit: 50 };
    const query = { ...oldQuery };

    if (query.unfinished) {
      query.$or = [
        {
          status: ORDER_STATUS.CREATED,
        },
        {
          status: ORDER_STATUS.IN_PROGRESS,
        },
      ];

      delete query.unfinished;
    }

    if (query.createdAtRange) {
      const { createdAtRange } = query;
      const [initialCreateAt, finalCreateAt] = createdAtRange;
      query.createdAt = {
        $gte: format(new Date(initialCreateAt), 'yyyy/MM/dd'),
        $lte: format(new Date(finalCreateAt), 'yyyy/MM/dd'),
      };
      delete query.createdAtRange;
    }

    return this.ordersRepository.paginate(query, {
      ...defaultOptions,
      ...options,
    });
  }
}
