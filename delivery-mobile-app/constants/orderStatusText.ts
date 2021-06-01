import { ORDER_STATUS } from '@edenjiga/delivery-common';

ORDER_STATUS;

export default {
  [ORDER_STATUS.CANCELED]: 'Cancelado',
  [ORDER_STATUS.COMPLETED]: 'Entregado',
  [ORDER_STATUS.IN_PROGRESS]: 'En camino',
  [ORDER_STATUS.CREATED]: 'En espera',
};
