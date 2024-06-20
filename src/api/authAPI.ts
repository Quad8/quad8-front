import type { FetchSignInInfoTypes } from '@/types/authTypes';

const BASE_URL = process.env.NEXT_PUBLIC_KEYDEUK_API_BASE_URL;

export const getCheckEmailDuplication = async (emailValue: string) => {
  const url = `${BASE_URL}/api/v1/users/check/email?email=${emailValue}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getCheckNicknameDuplication = async (nickname: string) => {
  const url = `${BASE_URL}/api/v1/users/check/nickname?nickname=${nickname}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const postSignup = async (formData: FormData) => {
  const url = `${BASE_URL}/api/v1/users`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        accept: 'application/json',
      },
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const postSignin = async (formData: FetchSignInInfoTypes) => {
  const url = `${BASE_URL}/login`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
