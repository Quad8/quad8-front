import { FieldValues } from 'react-hook-form';

interface PutEditProfileProps {
  payload: FieldValues;
  token: string | null;
}

/**
 * 주어진 토큰을 사용하여 사용자 데이터를 가져
 *
 * @param {string} token - 인증 토큰입니다.
 * @returns {Promise<Object>} - 사용자 데이터를 반환합니다.
 * @throws {Error} - 요청이 실패한 경우 에러를 던집니다.
 */
export async function getUserData(token: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_KEYDEUK_API_BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('회원정보 가져오기 실패!', error);
    throw error;
  }
}

/**
 * 주어진 payload로 사용자 프로필을 업데이트
 *
 * @param {FieldValues} payload - 사용자 프로필을 업데이트할 데이터입니다.
 * @returns {Promise<Object>} - 응답 데이터를 반환합니다.
 * @throws {Error} - 요청이 실패한 경우 에러를 던집니다.
 */
export async function putEditProfile({ payload, token }: PutEditProfileProps) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_KEYDEUK_API_BASE_URL}/users/me`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    return await res.json();
  } catch (error) {
    console.error('짜잔 ~ putEditProfile 실패', error);
    throw error;
  }
}

/**
 * 주어진 닉네임이 사용 가능한지 확인
 *
 * @param {string} nickname - 확인할 닉네임입니다.
 * @returns {Promise<Object>} - 닉네임이 사용 가능한지 여부를 나타내는 응답 데이터를 반환합니다.
 * @throws {Error} - 요청이 실패한 경우 에러를 던집니다.
 */
export async function checkNickname(nickname: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_KEYDEUK_API_BASE_URL}/users/check/nickname?nickname=${nickname}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const result = await res.json();
    return result;
  } catch (error) {
    console.error('checkEmail 실패', error);
    throw error;
  }
}
