import { omit } from 'lodash';
import storageService from './storageService';
import { loaderService } from './loader';
import { store } from '@/store';
import * as userActions from '@/store/actions/user';
const FETCH_TIMEOUT = 10000;

interface IRequestInit extends RequestInit {
  body?: any;
  params?: { [key: string]: any };
}

const apiService = (url: string) => {
  const request = async <T>(
    endpoint: string,
    options: IRequestInit,
    timeout?: number,
  ): Promise<T> => {
    const optionsFormater: RequestInit = omit(options, 'body');

    if (options.params) {
      endpoint = `${endpoint}?${new URLSearchParams(
        options.params,
      ).toString()}`;
    }

    if (options.body) {
      optionsFormater.body = JSON.stringify(options.body);
    }

    try {
      loaderService.show();
      return await fetchWithTimeout<T>(endpoint, optionsFormater, timeout);
    } finally {
      loaderService.hide();
    }
  };

  const fetchWithTimeout = async <T>(
    endpoint: string,
    options: RequestInit,
    timeout: number = FETCH_TIMEOUT,
    attempt = 0,
  ): Promise<T> => {
    const abortController = new AbortController();
    let timeoutId;

    const timeOutPromise = new Promise((_, reject) => {
      timeoutId = setTimeout(() => {
        abortController.abort();
        reject(new Error('fetch request timeout'));
      }, timeout);
    });

    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      const userToken = storageService.getToken();
      if (userToken) {
        headers.Authorization = `Bearer ${userToken}`;
      }

      const result: Response = await Promise.race([
        fetch(`${url}${endpoint}`, {
          headers,
          ...options,
          signal: abortController.signal,
        }),
        <any>timeOutPromise,
      ]);

      clearTimeout(timeoutId);

      const response: T = await result.json();
      if (!result.ok) {
        throw response;
      }

      return response;
    } catch (error) {
      if (
        (error.message === 'fetch request timeout' ||
          error.message === 'Network request failed') &&
        attempt < 3
      ) {
        return await fetchWithTimeout(url, options, timeout, ++attempt);
      }

      if (error.statusCode === 401) {
        store.dispatch(userActions.logOut());
        await storageService.clearToken();
      }
      throw error;
    }
  };

  function get<T>(endpoint: string, options?: IRequestInit, timeout?: number) {
    return request<T>(endpoint, { ...options, method: 'GET' }, timeout);
  }

  function post<T>(endpoint: string, options?: IRequestInit, timeout?: number) {
    return request<T>(endpoint, { ...options, method: 'POST' }, timeout);
  }

  function patch<T>(
    endpoint: string,
    options?: IRequestInit,
    timeout?: number,
  ) {
    return request<T>(endpoint, { ...options, method: 'PATCH' }, timeout);
  }

  return {
    get,
    post,
    patch,
  };
};

export default apiService;
