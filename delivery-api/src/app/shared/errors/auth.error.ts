import { BadRequestException } from '@nestjs/common';

class AuthError extends BadRequestException {
  public code;
  constructor(code) {
    super(null, code);
    this.code = code;
  }
}

export class AuthInvalidTokenError extends AuthError {
  public static readonly code = 'INVALID_TOKEN';
  constructor() {
    super(AuthInvalidTokenError.code);
  }
}

export class AuthBadEmailOrPassword extends AuthError {
  public static readonly code = 'invalid-email-or-password';
  constructor() {
    super(AuthBadEmailOrPassword.code);
  }
}
