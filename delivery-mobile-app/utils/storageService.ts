import { Storage } from "@/constants";
import * as SecureStore from "expo-secure-store";
import { Address } from "@edenjiga/delivery-common";

const cache: { token: null | string; address: Address | null } = {
  token: null,
  address: null,
};

function getToken() {
  return cache.token;
}

async function setToken(token: string) {
  await SecureStore.setItemAsync(Storage.TOKEN_KEY, token);
  cache.token = token;
}

function getAddress() {
  return cache.address;
}

async function setAddress(address: Address) {
  const addressString = JSON.stringify(address);
  await SecureStore.setItemAsync(Storage.USER_ADDRESS, addressString);
  cache.address = address;
}

async function clear() {
  await SecureStore.deleteItemAsync(Storage.TOKEN_KEY);
}

async function initialize() {
  cache.token = await SecureStore.getItemAsync(Storage.TOKEN_KEY);
  const address = await SecureStore.getItemAsync(Storage.USER_ADDRESS);
  cache.address = address ? JSON.parse(address) : null;
}

const storageService = {
  getAddress,
  getToken,
  setAddress,
  setToken,
  clear,
  initialize,
};

export default storageService;
