import { BadRequestException } from '@nestjs/common';
import { ErrorCodes } from '@edenjiga/delivery-common';
class AuthError extends BadRequestException {
  public code;
  constructor(code: ErrorCodes) {
    super(null, code);
    this.code = code;
  }
}

export class AuthInvalidTokenError extends AuthError {
  public static readonly code = ErrorCodes.INVALID_TOKEN;
  constructor() {
    super(AuthInvalidTokenError.code);
  }
}

export class AuthBadEmailOrPassword extends AuthError {
  public static readonly code = ErrorCodes.INVALID_EMAIL_OR_PASSWORD;
  constructor() {
    super(AuthBadEmailOrPassword.code);
  }
}
