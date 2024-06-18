import { FetchSigninInfoTypes } from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_KEYDEUK_API_BASE_URL;

export const checkEmailDuplication = async (emailValue: string) => {
  const url = `${BASE_URL}/api/v1/users/check/email?email=${emailValue}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const checkNicknameDuplication = async (nickname: string) => {
  const url = `${BASE_URL}/api/v1/users/check/nickname?nickname=${nickname}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
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
    throw new Error('회원가입 실패!');
  }
};

export const postSignin = async (formData: FetchSigninInfoTypes) => {
  const url = `${BASE_URL}/login`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(formData),
      credentials: 'include',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('로그인 실패!');
  }
};
