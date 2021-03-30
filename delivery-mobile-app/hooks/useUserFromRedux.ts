import { RootState } from '@/store';
import { IuserState } from '@/types';
import { useSelector } from 'react-redux';

const useUserFromRedux = () => {
  const user = useSelector<RootState, IuserState>((state) => state.user);
  return user;
};
export default useUserFromRedux;
