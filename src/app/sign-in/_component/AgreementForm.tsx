import classNames from 'classnames/bind';
import CheckIcon from '@/public/svgs/check.svg';
import styles from './AgreementForm.module.scss';

const cn = classNames.bind(styles);

export function AgreementForm() {
  return (
    <div className={cn('container')}>
      <CheckIcon />
    </div>
  );
}
