import classNames from 'classnames/bind';
import styles from './page.module.scss';
import ReviewModalTest from './ReviewModalTest';

const cn = classNames.bind(styles);

export default function Page() {
  return (
    <div className={cn('container')}>
      <ReviewModalTest />
    </div>
  );
}
