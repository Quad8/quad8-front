import classNames from 'classnames/bind';
import SignupForm from './_component/SignupForm';
import styles from './page.module.scss';

const cn = classNames.bind(styles);

export default function Page() {
  return (
    <div className={cn('container')}>
      <div className={cn('content-wrapper')}>
        <SignupForm />;
      </div>
    </div>
  );
}
