import classNames from 'classnames/bind';
import Signup from './_component/Signup';
import styles from './page.module.scss';

const cn = classNames.bind(styles);

export default function Page() {
  return (
    <div className={cn('container')}>
      <div className={cn('content-wrapper')}>
        <Signup />;
      </div>
    </div>
  );
}
