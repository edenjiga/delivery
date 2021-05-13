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
  public static readonly code = ErrorCodes['order-not-found'];
  constructor(message?: string) {
    super(message, OrderNotFoundError.code);
  }
}

export class OrderNotCancellableError extends OrdersError {
  public static readonly code = ErrorCodes['non-cancellable-order'];
  constructor(message?: string) {
    super(OrderNotCancellableError.code, message);
  }
}

export class OrderBadStatusUpdateError extends OrdersError {
  public static readonly code = ErrorCodes['bad-status-order'];
  constructor(message?: string) {
    super(OrderBadStatusUpdateError.code, message);
  }
}

export class ProductOutStockError extends OrdersError {
  public static readonly code = ErrorCodes['product-out-stock'];
  constructor(message?: string) {
    super(ProductOutStockError.code, message);
  }
}

export class BadPriceError extends OrdersError {
  public static readonly code = ErrorCodes['bad-price'];
  constructor(message?: string) {
    super(BadPriceError.code, message);
  }
}

export class InvalidPaymentError extends OrdersError {
  public static readonly code = ErrorCodes['invalid-payment'];
  constructor(message?: string) {
    super(InvalidPaymentError.code, message);
  }
}

export class StoreCloseError extends OrdersError {
  public static readonly code = ErrorCodes['store-close'];
  constructor(message?: string) {
    super(StoreCloseError.code, message);
  }
}
