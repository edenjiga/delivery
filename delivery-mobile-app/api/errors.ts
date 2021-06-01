import { MobileErrorDto } from '@edenjiga/delivery-common';
import mainApi from './mainApi';

const saveError = (body: MobileErrorDto) =>
  mainApi.post('/errors', {
    body,
  });

export { saveError };
