'use client';

import classNames from 'classnames/bind';

import styles from './AuthButton.module.scss';

const cn = classNames.bind(styles);

interface LoginButtonProps {
  onClick: () => void;
}

export default function LoginButton({ onClick }: LoginButtonProps) {
  return (
    <button className={cn('button')} type='button' onClick={onClick}>
      로그인
    </button>
  );
}
