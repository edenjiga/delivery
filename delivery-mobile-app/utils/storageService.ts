import { Address } from '@edenjiga/delivery-common';
import { Storage } from '@/constants';
import { store } from '@/store';
import * as SecureStore from 'expo-secure-store';
import * as addressActions from '@/store/actions/address';

const cache: { token: null | string; address: Address | null } = {
  token: null,
  address: null,
};

function getToken(): string | null {
  return cache.token;
}

async function setToken(token: string): Promise<void> {
  await SecureStore.setItemAsync(Storage.TOKEN_KEY, token);
  cache.token = token;
}

function getAddress(): Address | null {
  return cache.address;
}

async function setAddress(address: Address): Promise<void> {
  const addressString = JSON.stringify(address);
  await SecureStore.setItemAsync(Storage.USER_ADDRESS, addressString);
  cache.address = address;
}

async function clearToken(): Promise<void> {
  await SecureStore.deleteItemAsync(Storage.TOKEN_KEY);
}

async function initialize(): Promise<void> {
  cache.token = await SecureStore.getItemAsync(Storage.TOKEN_KEY);
  const addressString = await SecureStore.getItemAsync(Storage.USER_ADDRESS);

  if (addressString) {
    const address = JSON.parse(addressString);
    store.dispatch(addressActions.setAddress(address));
    cache.address = address;
  }
}

const storageService = {
  getAddress,
  getToken,
  setAddress,
  setToken,
  clearToken,
  initialize,
};

export default storageService;
