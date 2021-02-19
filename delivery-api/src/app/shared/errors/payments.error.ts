import { BadRequestException } from '@nestjs/common';

export class PaymentError extends BadRequestException {
  public static readonly code = 'payment-error';
  constructor(message?: string) {
    super(message, PaymentError.code);
  }
}

export class PaymentNotCompletedError extends BadRequestException {
  public static readonly code = 'payment-not-completed-error';
  constructor(message?: string) {
    super(message, PaymentError.code);
  }
}
