import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as crypto from 'crypto';

import environment from '@/environment';
import { OrdersService } from '@/services';
import { OrderNotFoundError, WompiEventBody } from '@/shared';

@Injectable()
export class WompiUseCases {
  constructor(private orderService: OrdersService) {}

  public async handleWompiEvent(body: WompiEventBody) {
    const { signature, data, timestamp, event } = body;

    if (event !== 'transaction.updated') {
      return;
    }

    const {
      checksum,
      properties,
    }: { checksum: string; properties: [string] } = signature;

    const propertiesValuesInDataMerge = properties
      .map(this.getfirstKeyAndSecondKeyfromString)
      .reduce((prevValue, { firstKey, secondKey }) => {
        return prevValue + data[firstKey][secondKey];
      }, '');

    const stringToHash =
      propertiesValuesInDataMerge + timestamp + environment.wompi.eventsKey;

    const hash = crypto.createHash('sha256').update(stringToHash).digest('hex');
    if (hash !== checksum) {
      throw new UnauthorizedException();
    }

    const { reference, status } = data.transaction;
    const order = await this.orderService.findById(reference);

    if (!order) {
      throw new OrderNotFoundError();
    }

    const { payment } = order;
    payment.status = status;

    await this.orderService.updateOrderById(order._id, {
      payment,
    });

    return;
  }

  private getfirstKeyAndSecondKeyfromString(properties: string) {
    const [firstKey, secondKey] = properties.split('.');
    return {
      firstKey,
      secondKey,
    };
  }
}
