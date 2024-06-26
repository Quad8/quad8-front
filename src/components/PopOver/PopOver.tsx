'use client';

import classNames from 'classnames/bind';
import { useRef } from 'react';
import { useOutsideClick } from '@/hooks/useOutsideClick';

import styles from './PopOver.module.scss';

const cn = classNames.bind(styles);

interface OptionType {
  label: string;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

interface PopOverProps {
  optionsData: OptionType[];
  onHandleClose: () => void;
}

export default function PopOver({ optionsData, onHandleClose }: PopOverProps) {
  const ref = useRef(null);

  useOutsideClick(ref, onHandleClose);

  return (
    <div className={cn('pop-over-container')} ref={ref}>
      {optionsData.map((option) => (
        <div key={option.label} className={cn('option')} onClick={option.onClick}>
          {option.label}
        </div>
      ))}
    </div>
  );
}
