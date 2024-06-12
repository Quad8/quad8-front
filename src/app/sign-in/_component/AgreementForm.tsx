import classNames from 'classnames/bind';
import CheckIcon from '@/public/svgs/check';
import { useState } from 'react';
import RightArrow from '@/public/svgs/caretRight.svg';
import styles from './AgreementForm.module.scss';

const cn = classNames.bind(styles);

export function AgreementForm() {
  const [iconColors, setIconColors] = useState<string[]>(['#A5A5A5', '#A5A5A5', '#A5A5A5']);

  const changeColor = (i: number) => {
    const updatedColors = [...iconColors];
    updatedColors[i] = updatedColors[i] === '#A5A5A5' ? '#4968f6' : '#A5A5A5';
    setIconColors(updatedColors);
  };

  const handleAllCheck = () => {
    const allChecked = iconColors.every((color) => color === '#4968f6');
    const newColor = allChecked ? '#A5A5A5' : '#4968f6';
    setIconColors([newColor, newColor, newColor]);
  };

  return (
    <div className={cn('container')}>
      <div className={cn('title')}>
        <CheckIcon onClick={handleAllCheck} color={iconColors[0]} />
        <h2>아래 약관에 모두 동의합니다.</h2>
      </div>
      <div className={cn('content-wrapper')}>
        <div className={cn('content')}>
          <CheckIcon onClick={() => changeColor(1)} color={iconColors[1]} />
          <h3>서비스 이용 약관 동의</h3>
          <RightArrow className={cn('right-arrow')} />
        </div>
        <div className={cn('content')}>
          <CheckIcon onClick={() => changeColor(2)} color={iconColors[2]} />
          <h3>서비스 이용 약관 동의</h3>
          <RightArrow className={cn('right-arrow')} />
        </div>
      </div>
    </div>
  );
}
