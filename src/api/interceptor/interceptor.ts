import { getCookie } from '@/libs/manageCookie';
import { updateToken } from './updateToken';

interface ResponseAPIType<T> {
  data: T;
  message: string;
  status: string;
}
const requestAPI = async <T>(baseURL: string, url: string, option?: RequestInit): Promise<ResponseAPIType<T>> => {
  const accessToken = await getCookie('accessToken');
  const refreshToken = await getCookie('refreshToken');

  if (!accessToken || !refreshToken) {
    try {
      const response = await fetch(baseURL + url, {
        ...option,
        headers: {
          'Content-Type': 'application/json',
          ...option?.headers,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  const response = await fetch(baseURL + url, {
    ...option,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      ...option?.headers,
    },
  });

  if (!response.ok) {
    if (response.status === 401 && accessToken && refreshToken) {
      await updateToken(baseURL);
      const result: ResponseAPIType<T> = await requestAPI(baseURL, url, option);
      return result;
    }
    throw new Error(`API 오류 ${response.status}`);
  }
  const result = await response.json();

  return result;
};

class Interceptor {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async get<T>(url: string, option?: RequestInit) {
    const data = await requestAPI<T>(this.baseURL, url, { ...option, method: 'GET' });
    return data;
  }

  async post<T>(url: string, option?: RequestInit) {
    const data = await requestAPI<T>(this.baseURL, url, { ...option, method: 'POST' });
    return data;
  }

  async put<T>(url: string, option?: RequestInit) {
    const data = await requestAPI<T>(this.baseURL, url, { ...option, method: 'PUT' });
    return data;
  }

  async delete<T>(url: string, option?: RequestInit) {
    const data = await requestAPI<T>(this.baseURL, url, { ...option, method: 'DELETE' });
    return data;
  }
}

export const baseAPI = new Interceptor(process.env.NEXT_PUBLIC_KEYDEUK_API_BASE_URL as string);
