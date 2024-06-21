import classNames from 'classnames/bind';
import { WarnCircleIcon, CheckboxCircleIcon } from '@/public/index';

import styles from './DialogIcon.module.scss';

const cn = classNames.bind(styles);

interface DialogIconProps {
  iconType: 'warn' | 'accept';
}

export function DialogIcon({ iconType }: DialogIconProps) {
  if (iconType === 'warn') {
    return <WarnCircleIcon width={45} height={45} className={cn('warn-icon')} />;
  }

  return <CheckboxCircleIcon width={45} height={45} className={cn('accept-icon')} />;
}
