import classNames from 'classnames/bind';
import { RadioField } from '@/components';
import styles from './page.module.scss';
import ReviewModalTest from './ReviewModalTest';

const cn = classNames.bind(styles);

export default function Page() {
  return (
    <div className={cn('container')}>
      <RadioField label='성별' options={['남자', '여자']} />
      <ReviewModalTest />
    </div>
  );
}
