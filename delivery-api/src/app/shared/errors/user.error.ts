import { BadRequestException } from '@nestjs/common';

class UserError extends BadRequestException {
  public code;
  constructor(code, message?: string) {
    super(message, code);
    this.code = code;
  }
}

export class UserIncompleteError extends UserError {
  public static readonly code = 'user-incomplete';
  constructor(message?: string) {
    super(UserIncompleteError.code, message);
  }
}
