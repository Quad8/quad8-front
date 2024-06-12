import classNames from 'classnames/bind';
import Header from '@/components/Header/Header';
import styles from './page.module.scss';
import ReviewModalTest from './ReviewModalTest';
import ProfileImage from '../../components/ProfileImage/ProfileImage';

const cn = classNames.bind(styles);

export default function Page() {
  return (
    <div className={cn('container')}>
      <Header />
      <ProfileImage isEditable width={139} height={139} profileImage={null} />
      <ReviewModalTest />
    </div>
  );
}
