import { StoreCloseError } from '@edenjiga/delivery-common';

export const ErrorMessageHandle = (message: string): string => {
  let customMessage = 'Ups algo fallo';
  console.log(StoreCloseError, 'StoreCloseError');

  switch (message) {
    case StoreCloseError.code:
      customMessage = 'La tienda esta cerrada';
  }

  return customMessage;
};
