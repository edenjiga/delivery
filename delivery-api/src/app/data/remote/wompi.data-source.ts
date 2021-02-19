import environment from '@/environment';
import { IOrderDoc } from '@/models';
import { WompiSubmitPayResponse } from '@/shared';
import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class WompiDataSource {
  constructor(private httpService: HttpService) {}

  public async submitPay(order: IOrderDoc, userEmail: string) {
    const { price, payment, _id } = order;
    const chargeData = {
      amount_in_cents: price * 100,
      currency: 'COP',
      customer_email: userEmail,
      reference: _id.toString(),
      payment_source_id: payment.creditCard.paymentSourceId,
      payment_method: {
        installments: 1,
      },
    };

    const { data } = await this.httpService
      .post<WompiSubmitPayResponse>(
        `${environment.wompi.url}/transactions`,
        chargeData,
        {
          headers: {
            Authorization: `Bearer ${environment.wompi.privateKey}`,
          },
        },
      )
      .toPromise();

    return data.data;
  }

  private async getAcceptanceToken() {
    const { data } = await this.httpService
      .get<{ data: { presigned_acceptance: { acceptance_token: string } } }>(
        `${environment.wompi.url}/merchants/${environment.wompi.publicKey}`,
      )
      .toPromise();

    return data.data.presigned_acceptance.acceptance_token;
  }
}
