'use client';

import { deleteCookie } from 'cookies-next';

export default function LogoutButton() {
  const handleClickButton = () => {
    deleteCookie('accessToken');
    window.location.reload();
  };
  return (
    <button type="button" onClick={handleClickButton}>
      로그아웃
    </button>
  );
}
