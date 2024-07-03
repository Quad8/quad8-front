import { getCookie } from '@/libs/manageCookie';

const BASE_URL = process.env.NEXT_PUBLIC_KEYDEUK_API_BASE_URL;

export const postRefreshToken = async () => {
  const prevAccessToken = await getCookie('accessToken');
  const prevRefreshToken = await getCookie('refreshToken');

  try {
    const res = await fetch(`${BASE_URL}/api/v1/reissue`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accessToken: prevAccessToken, refreshToken: prevRefreshToken }),
    });

    const {
      data: { accessToken, refreshToken },
    } = await res.json();
    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
};
