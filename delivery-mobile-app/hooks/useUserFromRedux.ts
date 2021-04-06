import { RootState } from '@/store';
import { IuserState } from '@/types';
import { useSelector } from 'react-redux';

const useUserFromRedux = () => {
  return useSelector<RootState, IuserState>((state: RootState) => state.user);
  // return user;
};
export default useUserFromRedux;
