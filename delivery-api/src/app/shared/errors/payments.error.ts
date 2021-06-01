import { ErrorCodes } from '@edenjiga/delivery-common';
import { BadRequestException } from '@nestjs/common';

export class PaymentError extends BadRequestException {
  public static readonly code: ErrorCodes = ErrorCodes.PAYMENT_ERROR;
  constructor(message?: string) {
    super(message, PaymentError.code);
  }
}

export class PaymentNotCompletedError extends BadRequestException {
  public static readonly code: ErrorCodes = ErrorCodes.PAYMENT_NOT_COMPLETED;
  constructor(message?: string) {
    super(message, PaymentError.code);
  }
}
