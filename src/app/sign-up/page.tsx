import classNames from 'classnames/bind';
import Button from '@/components/Button/Button';
import styles from './page.module.scss';
import SignupModal from './_component/Signup';

const cn = classNames.bind(styles);
export default function page() {
  return (
    <div className={cn('container')}>
      <div className={cn('content-wrapper')}>
        <SignupModal />;
        <Button className={cn('button')} fontSize={24}>
          회원가입
        </Button>
      </div>
    </div>
  );
}
