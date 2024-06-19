'use client';

import classNames from 'classnames/bind';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import RightArrow from '@/public/svgs/caretRight.svg';
import CheckIcon from '@/public/svgs/checkboxCircle.svg';

import styles from './AgreementCheckbox.module.scss';

const cn = classNames.bind(styles);

interface AgreementFormProps {
  setIsAllChecked: Dispatch<SetStateAction<boolean>>;
}

export default function AgreementCheckbox({ setIsAllChecked }: AgreementFormProps) {
  const NOT_CHECKED = '#A5A5A5';
  const CHECKED = '#4968f6';

  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [isCheckedItems, setIsCheckedItems] = useState<boolean[]>([false, false]);

  useEffect(() => {
    const allChecked = isCheckedItems.every((isChecked) => isChecked);
    setIsCheckedAll(allChecked);
    setIsAllChecked(allChecked);
  }, [isCheckedItems, setIsAllChecked]);

  const toggleAllCheckboxes = () => {
    const newCheckState = isCheckedAll ? [false, false] : [true, true];
    setIsCheckedItems(newCheckState);
  };

  const toggleCheckbox = (index: number) => {
    const newCheckState = [...isCheckedItems];
    newCheckState[index] = !newCheckState[index];
    setIsCheckedItems(newCheckState);
  };

  return (
    <div className={cn('container')}>
      <div className={cn('title')}>
        <CheckIcon onClick={toggleAllCheckboxes} fill={isCheckedAll ? CHECKED : NOT_CHECKED} width={19} height={19} />
        <h2>아래 약관에 모두 동의합니다.</h2>
      </div>
      <div className={cn('content-wrapper')}>
        <div className={cn('content')}>
          <CheckIcon
            onClick={() => toggleCheckbox(0)}
            fill={isCheckedItems[0] ? CHECKED : NOT_CHECKED}
            width={15}
            height={15}
          />
          <h3>서비스 이용 약관 동의</h3>
          <RightArrow className={cn('right-arrow')} stroke={isCheckedItems[0] ? CHECKED : NOT_CHECKED} />
        </div>
        <div className={cn('content')}>
          <CheckIcon
            onClick={() => toggleCheckbox(1)}
            fill={isCheckedItems[1] ? CHECKED : NOT_CHECKED}
            width={15}
            height={15}
          />
          <h3>개인정보 처리 방침 동의</h3>
          <RightArrow className={cn('right-arrow')} stroke={isCheckedItems[1] ? CHECKED : NOT_CHECKED} />
        </div>
      </div>
    </div>
  );
}
