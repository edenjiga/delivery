import { omit } from 'lodash';
import storageService from './storageService';
const FETCH_TIMEOUT = 10000;

interface IRequestInit extends RequestInit {
  body?: any;
}

const apiService = (url: string) => {
  const request = <T>(
    endpoint: string,
    options: IRequestInit,
    timeout?: number
  ): Promise<T> => {
    const optionsFormater: RequestInit = omit(options, 'body');

    if (options.body) {
      optionsFormater.body = JSON.stringify(options.body);
    }
    return fetchWithTimeout(endpoint, optionsFormater, timeout);
  };

  const fetchWithTimeout = async <T>(
    endpoint: string,
    options: RequestInit,
    timeout: number = FETCH_TIMEOUT,
    attempt = 0
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
      } else {
        throw error;
      }
    }
    // return
  };

  function get<T>(endpoint: string, options?: RequestInit, timeout?: number) {
    return request<T>(endpoint, { ...options, method: 'GET' }, timeout);
  }

  function post<T>(endpoint: string, options?: IRequestInit, timeout?: number) {
    return request<T>(endpoint, { ...options, method: 'POST' }, timeout);
  }

  //   function patch(endpoint, config) {
  //     return request({ method: "PATCH", endpoint, authToken, body });
  //   }

  return {
    get,
    post,
    // patch,
  };
};

export default apiService;
