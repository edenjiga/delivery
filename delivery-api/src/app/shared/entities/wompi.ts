import { PAYMENT_STATUS } from '@edenjiga/delivery-common';

export interface WompiSubmitPayResponse {
  data: {
    id: string;
    created_at: '2021-01-25T23:11:10.410Z';
    amount_in_cents: number;
    reference: string;
    customer_email: string;
    currency: string;
    payment_method_type: string;
    payment_method: {
      type: string;
      extra: {
        bin: string;
        name: string;
        brand: string;
        exp_year: string;
        exp_month: string;
        last_four: string;
      };
      installments: number;
    };
    status: PAYMENT_STATUS;
    status_message: null;
    shipping_address: null;
    redirect_url: null;
    payment_source_id: number;
    payment_link_id: null;
    customer_data: null;
    bill_id: null;
  };
}

export interface WompiEventBody {
  event: string;
  data: {
    [key: string]: any;
  };
  sent_at: string;
  timestamp: number;
  signature: {
    checksum: string;
    properties: [string];
  };
  environment: string;
}
