'use client';

import classNames from 'classnames/bind';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

// import CheckIcon from '@/public/svgs/check';
import RightArrow from '@/public/svgs/caretRight.svg';
import CheckIcon from '@/public/svgs/checkboxCircle.svg';

import styles from './AgreementForm.module.scss';

const cn = classNames.bind(styles);

interface AgreementFormProps {
  setIsAllChecked: Dispatch<SetStateAction<boolean>>;
}

export function AgreementForm({ setIsAllChecked }: AgreementFormProps) {
  const NOT_CHECKED = '#A5A5A5';
  const CHECKED = '#4968f6';

  const [iconColors, setIconColors] = useState<string[]>([NOT_CHECKED, NOT_CHECKED, NOT_CHECKED]);

  const changeColor = (i: number) => {
    const updatedColors = [...iconColors];
    updatedColors[i] = updatedColors[i] === NOT_CHECKED ? CHECKED : NOT_CHECKED;
    setIconColors(updatedColors);
  };

  const handleAllCheck = () => {
    const allChecked = iconColors.every((color) => color === CHECKED);
    const newColor = allChecked ? NOT_CHECKED : CHECKED;
    setIconColors([newColor, newColor, newColor]);
  };

  useEffect(() => {
    if (iconColors[0] === CHECKED && iconColors[1] === CHECKED && iconColors[2] === CHECKED) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }

    const isAllNoCheck = iconColors[0] === CHECKED && iconColors[1] === NOT_CHECKED && iconColors[2] === NOT_CHECKED;
    const isAllCheck = iconColors[0] === NOT_CHECKED && iconColors[1] === CHECKED && iconColors[2] === CHECKED;

    if (isAllNoCheck) setIconColors([NOT_CHECKED, NOT_CHECKED, NOT_CHECKED]);
    if (isAllCheck) setIconColors([CHECKED, CHECKED, CHECKED]);
  }, [iconColors, setIsAllChecked]);

  return (
    <div className={cn('container')}>
      <div className={cn('title')}>
        <CheckIcon onClick={handleAllCheck} fill={iconColors[0]} width={19} height={19} />
        <h2>아래 약관에 모두 동의합니다.</h2>
      </div>
      <div className={cn('content-wrapper')}>
        <div className={cn('content')}>
          <CheckIcon onClick={() => changeColor(1)} fill={iconColors[1]} width={15} height={15} />
          <h3>서비스 이용 약관 동의</h3>
          <RightArrow className={cn('right-arrow')} stroke={NOT_CHECKED} />
        </div>
        <div className={cn('content')}>
          <CheckIcon onClick={() => changeColor(2)} fill={iconColors[2]} width={15} height={15} />
          <h3>서비스 이용 약관 동의</h3>
          <RightArrow className={cn('right-arrow')} stroke={NOT_CHECKED} />
        </div>
      </div>
    </div>
  );
}
