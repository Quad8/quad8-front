import classNames from 'classnames/bind';
import Header from '@/components/Header/Header';
import styles from './page.module.scss';
import SignupModal from './_component/Signup';

const cn = classNames.bind(styles);
export default function page() {
  return (
    <div className={cn('container')}>
      <Header />
      <SignupModal />;
    </div>
  );
}
