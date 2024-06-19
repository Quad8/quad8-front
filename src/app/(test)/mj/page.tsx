import classNames from 'classnames/bind';
// import ProfileImage from '@/components/ProfileImage/ProfileImage';
import DatePicker from '@/components/DatePicker/DatePicker';
import styles from './page.module.scss';
// import ReviewModalTest from './ReviewModalTest';

const cn = classNames.bind(styles);

export default function Page() {
  return (
    <div className={cn('container')}>
      <DatePicker />
      {/* <ProfileImage isEditable width={139} height={139} profileImage={null} /> */}
      {/* <ReviewModalTest /> */}
    </div>
  );
}
