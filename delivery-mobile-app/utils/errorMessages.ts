import { ErrorCodes } from '@edenjiga/delivery-common';

export const HandleErrorMessage = (message: string): string => {
  let customMessage = 'Ups algo fallo';

  switch (message) {
    case ErrorCodes.STORE_CLOSE:
      customMessage = 'La tienda esta cerrada';
  }

  return customMessage;
};
