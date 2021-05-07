import { BadRequestException, NotFoundException } from '@nestjs/common';

class OrdersError extends BadRequestException {
  public code;
  constructor(code, message?: string) {
    super(message, code);
    this.code = code;
  }
}

export class OrderNotFoundError extends NotFoundException {
  public static readonly code = 'order-not-found';
  constructor(message?: string) {
    super(message, OrderNotFoundError.code);
  }
}

export class OrderNotCancellableError extends OrdersError {
  public static readonly code = 'non-cancellable-order';
  constructor(message?: string) {
    super(OrderNotCancellableError.code, message);
  }
}

export class OrderBadStatusUpdateError extends OrdersError {
  public static readonly code = 'bad-status-order';
  constructor(message?: string) {
    super(OrderBadStatusUpdateError.code, message);
  }
}

export class ProductOutStockError extends OrdersError {
  public static readonly code = 'product-out-stock';
  constructor(message?: string) {
    super(ProductOutStockError.code, message);
  }
}

export class BadPriceError extends OrdersError {
  public static readonly code = 'bad-price';
  constructor(message?: string) {
    super(BadPriceError.code, message);
  }
}

export class InvalidPaymentError extends OrdersError {
  public static readonly code = 'invalid-payment';
  constructor(message?: string) {
    super(InvalidPaymentError.code, message);
  }
}

export class StoreCloseError extends OrdersError {
  public static readonly code = 'store-close';
  constructor(message?: string) {
    super(StoreCloseError.code, message);
  }
}
