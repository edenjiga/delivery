import { GetSettingsResponse } from '@edenjiga/delivery-common';
import mainApi from './mainApi';

const getSettings = (): Promise<GetSettingsResponse> =>
  mainApi.get<GetSettingsResponse>('/settings', {});

export { getSettings };
