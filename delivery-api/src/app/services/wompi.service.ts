import { WompiDataSource } from '@/data';
import { IOrderDoc } from '@/models';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WompiService {
  constructor(private wompiDataSource: WompiDataSource) {}

  public submitPay(order: IOrderDoc, userEmail: string) {
    return this.wompiDataSource.submitPay(order, userEmail);
  }
}
