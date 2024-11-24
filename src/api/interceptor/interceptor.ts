import { getCookie } from '@/utils/manageCookie';
import { updateToken } from './updateToken';

interface ResponseAPIType<T> {
  data: T;
  message: string;
  status: string;
}
const requestAPI = async <T>(
  baseURL: string,
  url: string,
  option?: RequestInit,
  retryWithoutToken?: boolean,
): Promise<ResponseAPIType<T>> => {
  const accessToken = await getCookie('accessToken');
  const fetchOption = {
    ...option,
    headers: {
      ...option?.headers,
    },
  };
  if (!(option?.body instanceof FormData)) {
    Object.assign(fetchOption.headers, { 'Content-Type': 'application/json' });
  }

  if (!accessToken) {
    try {
      const response = await fetch(baseURL + url, fetchOption);

      const data: ResponseAPIType<T> = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    } catch (error) {
      throw error;
    }
  }
  try {
    const response = await fetch(baseURL + url, {
      ...fetchOption,
      headers: {
        ...fetchOption.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      const isClient = typeof window !== 'undefined';
      const refreshToken = await getCookie('refreshToken');
      if (response.status === 401) {
        if (retryWithoutToken) {
          const res = await fetch(baseURL + url, fetchOption);
          const result: ResponseAPIType<T> = await res.json();
          if (!res.ok) {
            throw new Error(result.message);
          }
          return result;
        }
        if (accessToken && refreshToken && isClient) {
          await updateToken();
          const result: ResponseAPIType<T> = await requestAPI(baseURL, url, option);
          return result;
        }
      }
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    throw error;
  }
};

class Interceptor {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async get<T>(url: string, option?: RequestInit, retryWithoutToken?: boolean) {
    const data = await requestAPI<T>(this.baseURL, url, { ...option, method: 'GET' }, retryWithoutToken);
    return data;
  }

  async post<T>(url: string, option?: RequestInit, retryWithoutToken?: boolean) {
    const data = await requestAPI<T>(this.baseURL, url, { ...option, method: 'POST' }, retryWithoutToken);
    return data;
  }

  async put<T>(url: string, option?: RequestInit, retryWithoutToken?: boolean) {
    const data = await requestAPI<T>(this.baseURL, url, { ...option, method: 'PUT' }, retryWithoutToken);
    return data;
  }

  async delete<T>(url: string, option?: RequestInit, retryWithoutToken?: boolean) {
    const data = await requestAPI<T>(this.baseURL, url, { ...option, method: 'DELETE' }, retryWithoutToken);
    return data;
  }
}

export const baseAPI = new Interceptor(process.env.NEXT_PUBLIC_KEYDEUK_API_BASE_URL as string);
