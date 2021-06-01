import apiService from '@/utils/apiService';
import environment from '@/environment';

const mainApi = apiService(environment.apiUrl);
export default mainApi;
