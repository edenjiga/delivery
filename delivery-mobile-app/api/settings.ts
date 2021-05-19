import mainApi from './mainApi';

const getSettings = () => mainApi.get('/settings', {});

export { getSettings };
