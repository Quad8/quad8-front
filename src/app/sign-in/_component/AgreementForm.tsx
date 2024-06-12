import classNames from 'classnames/bind';
import CheckIcon from '@/public/svgs/check';
import { useEffect, useState } from 'react';
import RightArrow from '@/public/svgs/caretRight.svg';
import styles from './AgreementForm.module.scss';

const cn = classNames.bind(styles);

export function AgreementForm() {
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
    const isAllNoCheck = iconColors[0] === CHECKED && iconColors[1] === NOT_CHECKED && iconColors[2] === NOT_CHECKED;
    const isAllCheck = iconColors[0] === NOT_CHECKED && iconColors[1] === CHECKED && iconColors[2] === CHECKED;

    if (isAllNoCheck) setIconColors([NOT_CHECKED, NOT_CHECKED, NOT_CHECKED]);
    if (isAllCheck) setIconColors([CHECKED, CHECKED, CHECKED]);
  }, [iconColors]);

  return (
    <div className={cn('container')}>
      <div className={cn('title')}>
        <CheckIcon onClick={handleAllCheck} color={iconColors[0]} />
        <h2>아래 약관에 모두 동의합니다.</h2>
      </div>
      <div className={cn('content-wrapper')}>
        <div className={cn('content')}>
          <CheckIcon onClick={() => changeColor(1)} color={iconColors[1]} width={20} height={20} />
          <h3>서비스 이용 약관 동의</h3>
          <RightArrow className={cn('right-arrow')} stroke={NOT_CHECKED} />
        </div>
        <div className={cn('content')}>
          <CheckIcon onClick={() => changeColor(2)} color={iconColors[2]} width={20} height={20} />
          <h3>서비스 이용 약관 동의</h3>
          <RightArrow className={cn('right-arrow')} stroke={NOT_CHECKED} />
        </div>
      </div>
    </div>
  );
}
