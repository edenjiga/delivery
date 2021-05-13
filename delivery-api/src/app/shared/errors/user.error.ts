import { ErrorCodes } from '@edenjiga/delivery-common';
import { BadRequestException } from '@nestjs/common';

class UserError extends BadRequestException {
  public code;
  constructor(code: ErrorCodes, message?: string) {
    super(message, code);
    this.code = code;
  }
}

export class UserIncompleteError extends UserError {
  public static readonly code = ErrorCodes['user-incomplete'];
  constructor(message?: string) {
    super(UserIncompleteError.code, message);
  }
}
