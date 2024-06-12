import classNames from 'classnames/bind';
import CheckIcon from '@/public/svgs/check';
import { useState } from 'react';
import styles from './AgreementForm.module.scss';

const cn = classNames.bind(styles);

export function AgreementForm() {
  const [iconColor, setIconColor] = useState('#A5A5A5');

  const handleCheckIcon = () => {
    setIconColor(iconColor === '#A5A5A5' ? `#4968f6` : '#A5A5A5');
  };

  return (
    <div className={cn('container')}>
      <div className={cn('title')}>
        <CheckIcon onClick={handleCheckIcon} color={iconColor} />
        <h2>아래 약관에 모두 동의합니다.</h2>
      </div>
    </div>
  );
}
