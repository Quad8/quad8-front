import classNames from 'classnames/bind';
import Button from '@/components/Button/Button';
import Signup from './_component/Signup';
import styles from './page.module.scss';

const cn = classNames.bind(styles);
export default function page() {
  return (
    <div className={cn('container')}>
      <div className={cn('content-wrapper')}>
        <Signup />;
        <Button className={cn('button')} fontSize={24}>
          회원가입
        </Button>
      </div>
    </div>
  );
}
