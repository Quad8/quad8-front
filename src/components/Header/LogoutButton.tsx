'use client';

import { deleteCookie } from '@/libs/manageCookie';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();
  const handleClickButton = () => {
    deleteCookie('accessToken');
    router.refresh();
  };

  return (
    <button type='button' onClick={handleClickButton}>
      로그아웃
    </button>
  );
}
