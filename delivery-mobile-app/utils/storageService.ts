import { Storage } from '@/constants';
import * as SecureStore from 'expo-secure-store';

const cache: { token: null | string } = {
  token: null,
};

function getToken() {
  return cache.token;
}

async function setToken(token: string) {
  await SecureStore.setItemAsync(Storage.TOKEN_KEY, token);
  cache.token = token;
}

async function clear() {
  await SecureStore.deleteItemAsync(Storage.TOKEN_KEY);
}

async function initialize() {
  cache.token = await SecureStore.getItemAsync(Storage.TOKEN_KEY);
}

const storageService = {
  getToken,
  setToken,
  clear,
  initialize,
};

export default storageService;
