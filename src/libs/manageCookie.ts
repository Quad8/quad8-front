'use server';

import { cookies } from 'next/headers';

export const deleteCookie = (key: string) => {
  const cookieStore = cookies();
  cookieStore.delete(key);
};

export const getCookie = (key: string) => {
  const cookieStore = cookies();
  const value = cookieStore.get(key)?.value ?? null;
  return value;
};
