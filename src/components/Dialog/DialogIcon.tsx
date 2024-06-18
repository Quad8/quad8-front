import { WarnCircleIcon, DeleteIcon, CheckBoxCircleIcon } from '@/public/index';
import classNames from 'classnames/bind';

import styles from './DialogIcon.module.scss';

const cn = classNames.bind(styles);

interface DialogIconProps {
  iconType: 'warn' | 'accept' | 'delete';
}

export function DialogIcon({ iconType }: DialogIconProps) {
  if (iconType === 'warn') {
    return <WarnCircleIcon width={45} height={45} className={cn('warn-icon')} />;
  }

  if (iconType === 'accept') {
    return <CheckBoxCircleIcon width={45} height={45} className={cn('accept-icon')} />;
  }

  return (
    <div className={cn('wrapper', 'delete-wrapper')}>
      <DeleteIcon width={40} height={40} className={cn('delete-icon')} />
    </div>
  );
}
