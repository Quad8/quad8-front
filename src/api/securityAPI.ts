import { getCookie } from '@/libs/manageCookie';

const BASE_URL = process.env.NEXT_PUBLIC_KEYDEUK_API_BASE_URL;

export const postRefreshToken = async (refreshToken: string) => {
  const accessToken = await getCookie('accessToken');

  try {
    const res = await fetch(`${BASE_URL}/api/v1/reissue`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ refreshToken }),
    });

    const result = await res.json();

    // console.log(result);

    return result;
  } catch (error) {
    // console.error('짜잔 토큰 갱싱 실패~', error);

    throw error;
  }
};
