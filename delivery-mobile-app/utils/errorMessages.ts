import { ErrorCodes } from '@edenjiga/delivery-common';

export const ErrorMessageHandle = (message: string): string => {
  let customMessage = 'Ups algo fallo';
  console.log(ErrorCodes, 'StoreCloseError');

  switch (message) {
    case ErrorCodes.STORE_CLOSE:
      customMessage = 'La tienda esta cerrada';
  }

  return customMessage;
};
