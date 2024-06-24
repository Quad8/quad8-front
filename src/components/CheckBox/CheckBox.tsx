'use client';

import classNames from 'classnames/bind';

import { CheckboxCircleIcon } from '@/public/index';
import styles from './CheckBox.module.scss';

const cn = classNames.bind(styles);

interface CheckBoxProps {
  isChecked: boolean;
  onClick: () => void;
}

export default function CheckBox({ isChecked, onClick }: CheckBoxProps) {
  return (
    <div className={cn('wrapper', { checked: isChecked })} onClick={onClick}>
      <CheckboxCircleIcon width={22} height={22} className={cn('icon')} />
    </div>
  );
}
