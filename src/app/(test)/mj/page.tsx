import classNames from 'classnames/bind';
import Header from '@/components/Header/Header';
import styles from './page.module.scss';
import ReviewModalTest from './ReviewModalTest';

const cn = classNames.bind(styles);

export default function Page() {
  return (
    <div className={cn('container')}>
      <Header />
      <ReviewModalTest />
    </div>
  );
}
