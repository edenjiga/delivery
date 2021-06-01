import { RootState } from '@/store';
import { GetSettingsResponse } from '@edenjiga/delivery-common';
import { useSelector } from 'react-redux';

const useSettings = () => {
  return useSelector<RootState, Partial<GetSettingsResponse>>(
    (state) => state.settings,
  );
};
export default useSettings;
