import type { Users } from '@/types/userType';
import { baseAPI } from './interceptor/interceptor';

const BASE_URL = process.env.NEXT_PUBLIC_KEYDEUK_API_BASE_URL;

/**
 * 주어진 토큰을 사용하여 사용자 데이터를 호출
 *
 * @returns {Promise<Object>} - 사용자 데이터를 반환합니다.
 * @throws {Error} - 요청이 실패한 경우 에러를 던집니다.
 */
export const getUserData = async () => {
  try {
    const data = await baseAPI.get<Users>('/api/v1/users/me');
    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * 주어진 payload로 사용자 프로필을 업데이트
 *
 * @param {FieldValues} payload - 사용자 프로필을 업데이트할 데이터입니다.
 * @returns {Promise<Object>} - 응답 데이터를 반환합니다.
 * @throws {Error} - 요청이 실패한 경우 에러를 던집니다.
 */
export const putEditProfile = async (formData: FormData) => {
  try {
    const result = await baseAPI.put('/api/v1/users/me', {
      body: formData,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * 주어진 닉네임이 사용 가능한지 확인
 *
 * @param {string} nickname - 확인할 닉네임입니다.
 * @returns {Promise<Object>} - 닉네임이 사용 가능한지 여부를 나타내는 응답 데이터를 반환합니다.
 * @throws {Error} - 요청이 실패한 경우 에러를 던집니다.
 */
export const checkNickname = async (nickname: string) => {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/users/check/nickname?nickname=${nickname}`);

    const result = await res.json();
    return result;
  } catch (error) {
    throw error;
  }
};
