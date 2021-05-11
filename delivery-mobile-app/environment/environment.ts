import Constants from 'expo-constants';
// import uatEnv from './environment.uat';
// import prodEnv from './environment.prod';
// import qaEnv from './environment.qa';

const defaultEnv = {
  // facebookAppId: '810634859679461',
  apiUrl: 'https://qa.edgarjimenezg.com',
  socketUrl: 'https://qa.edgarjimenezg.com',
  whatsappNumber: '573243343140',
  whatappDefaultText: 'Hola quisiera pedir:',
  instagramUrl: 'user?username=kangaroo_oficial',
  email: 'kangarooayuda@gmail.com',
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  let envValues = {};
  // switch (env) {
  //   // case 'uat':
  //   //   envValues = uatEnv;
  //   //   break;
  //   // case 'prd':
  //   //   envValues = prodEnv;
  //   //   break;
  //   // case 'test':
  //   //   envValues = { env: 'test' };
  //   //   break;
  //   default:
  //     envValues = qaEnv;
  //     break;
  // }
  return { ...defaultEnv, ...envValues };
};

export default getEnvVars;
