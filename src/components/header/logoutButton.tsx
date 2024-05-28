'use client';

export default function LogoutButton() {
  const handleClickButton = () => {
    /* delete accessToken => library 사용 */
    console.log('');
  };
  return (
    <button type="button" onClick={handleClickButton}>
      로그아웃
    </button>
  );
}
