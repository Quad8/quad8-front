'use client';

import { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import isTextOverFlow from '@/utils/isTextOverFlow';

import styles from './ShopOption.module.scss';

const cn = classNames.bind(styles);

interface ShopOptionProps {
  optionName: string | null;
}

export default function ShopOption({ optionName }: ShopOptionProps) {
  const optionRef = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    const isOverFlow = isTextOverFlow(optionRef);
    if (isOverFlow) {
      setIsHover(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <div className={cn('wrapper')}>
      {optionName && (
        <div className={cn('option-text-wrapper')} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className={cn('option-text')} ref={optionRef}>
            {optionName}
          </div>
          {isHover && <div className={cn('tooltip-wrapper')}>{optionName}</div>}
        </div>
      )}
    </div>
  );
}
