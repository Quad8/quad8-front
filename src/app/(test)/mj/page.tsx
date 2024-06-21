'use client';

import classNames from 'classnames/bind';
// import ProfileImage from '@/components/ProfileImage/ProfileImage';
import styles from './page.module.scss';
import DatePickerTest from './test/DatePickerTest';
// import ReviewModalTest from './ReviewModalTest';

const cn = classNames.bind(styles);

export default function Page() {
  return (
    <div className={cn('container')}>
      <DatePickerTest />
      {/* <ProfileImage isEditable width={139} height={139} profileImage={null} /> */}
      {/* <ReviewModalTest /> */}
    </div>
  );
}
