'use client';

import classNames from 'classnames/bind';
import styles from './AuthButton.module.scss';

const cn = classNames.bind(styles);

export default function LoginButton() {
  const handleClickButton = () => {
    /* Login modal */
  };

  return (
    <button className={cn('button')} type='button' onClick={handleClickButton}>
      로그인
    </button>
  );
}
