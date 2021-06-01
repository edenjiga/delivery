import { ErrorCodes } from '@edenjiga/delivery-common';
import { BadRequestException, NotFoundException } from '@nestjs/common';

class OrdersError extends BadRequestException {
  public code;
  constructor(code: ErrorCodes, message?: string) {
    super(message, code);
    this.code = code;
  }
}

export class OrderNotFoundError extends NotFoundException {
  public static readonly code = ErrorCodes.ORDER_NOT_FOUND;
  constructor(message?: string) {
    super(message, OrderNotFoundError.code);
  }
}

export class OrderNotCancellableError extends OrdersError {
  public static readonly code = ErrorCodes.NON_CANCELLABLE_ORDER;
  constructor(message?: string) {
    super(OrderNotCancellableError.code, message);
  }
}

export class OrderBadStatusUpdateError extends OrdersError {
  public static readonly code = ErrorCodes.BAD_STATUS_ORDER;
  constructor(message?: string) {
    super(OrderBadStatusUpdateError.code, message);
  }
}

export class ProductOutStockError extends OrdersError {
  public static readonly code = ErrorCodes.PRODUCT_OUT_STOCK;
  constructor(message?: string) {
    super(ProductOutStockError.code, message);
  }
}

export class BadPriceError extends OrdersError {
  public static readonly code = ErrorCodes.BAD_PRICE;
  constructor(message?: string) {
    super(BadPriceError.code, message);
  }
}

export class InvalidPaymentError extends OrdersError {
  public static readonly code = ErrorCodes.INVALID_PAYMENT;
  constructor(message?: string) {
    super(InvalidPaymentError.code, message);
  }
}

export class StoreCloseError extends OrdersError {
  public static readonly code = ErrorCodes.STORE_CLOSE;
  constructor(message?: string) {
    super(StoreCloseError.code, message);
  }
}
