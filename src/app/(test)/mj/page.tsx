'use client';

import classNames from 'classnames/bind';
import ProfileImage from '@/components/ProfileImage/ProfileImage';
import { toast } from 'react-toastify';
import { Button } from '@/components';
import styles from './page.module.scss';
import ReviewModalTest from './ReviewModalTest';

const cn = classNames.bind(styles);

export default function Page() {
  const handleButton = () => {
    toast.success('회원가입이 완료되었습니다.');
  };

  return (
    <div className={cn('container')}>
      <Button onClick={handleButton}>토승트</Button>
      <ProfileImage isEditable width={139} height={139} profileImage={null} />
      <ReviewModalTest />
    </div>
  );
}
