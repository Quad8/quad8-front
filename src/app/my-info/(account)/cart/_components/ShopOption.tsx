'use client';

import { useRef, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './ShopOption.module.scss';

const cn = classNames.bind(styles);

interface ShopOptionProps {
  optionName: string | null;
  count: number;
}

export default function ShopOption({ optionName, count }: ShopOptionProps) {
  const optionRef = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);

  const isTextOverflow = () => {
    const target = optionRef.current;
    if (!target) {
      return false;
    }
    if (target.clientWidth >= target.scrollWidth) {
      return false;
    }
    return true;
  };

  const handleMouseEnter = () => {
    const isOverFlow = isTextOverflow();
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

      <div className={cn('count-text')}>{count}개</div>
    </div>
  );
}
