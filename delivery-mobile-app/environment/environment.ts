import Constants from 'expo-constants';
// import uatEnv from './environment.uat';
// import prodEnv from './environment.prod';
// import qaEnv from './environment.qa';

const defaultEnv = {
  // facebookAppId: '810634859679461',
  apiUrl: 'https://qa.kanguroo.xyz',
  socketUrl: 'https://qa.kanguroo.xyz',
  whatsappNumber: '573243343140',
  whatappDefaultText: 'Hola quisiera pedir:',
  instagramUrl: 'user?username=kangaroo_oficial',
  email: 'kangarooayuda@gmail.com',
};

const prodEnv = {
  apiUrl: 'https://kanguroo.xyz',
  socketUrl: 'https://kanguroo.xyz',
  whatsappNumber: '573243343140',
  whatappDefaultText: 'Hola quisiera pedir:',
  instagramUrl: 'user?username=kangaroo_oficial',
  email: 'kangarooayuda@gmail.com',
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  let envValues = {};
  switch (env) {
    //   // case 'uat':
    //   //   envValues = uatEnv;
    //   //   break;
    case 'prd':
      envValues = prodEnv;
      break;
    //   // case 'test':
    //   //   envValues = { env: 'test' };
    //   //   break;
    default:
      envValues = defaultEnv;
      break;
  }

  return {
    ...defaultEnv,
    ...envValues,
    nativeAppVersion: Constants.manifest.version,
  };
};

export default getEnvVars;
