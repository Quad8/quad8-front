'use client';

import { ChangeEvent, forwardRef, useState, FocusEvent, useEffect } from 'react';
import classNames from 'classnames/bind';

import { Input } from '@/components/parts';
import { CrossIcon, DashIcon } from '@/public/index';

import styles from './CountInput.module.scss';

const cn = classNames.bind(styles);

interface CountInputProps {
  value?: number;
  onChange?: (value: number) => void;
}

export default forwardRef<HTMLInputElement, CountInputProps>(function CountInput({ value, onChange }, ref, ...rest) {
  const [count, setCount] = useState<number | ''>(value ?? 1);
  const handleClickButton = (type: 'decrease' | 'increase') => {
    if (type === 'decrease') {
      setCount((prev) => Math.max(Number(prev) - 1, 1));
      return;
    }
    setCount((prev) => Math.min(Number(prev) + 1, 99));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === '') {
      setCount('');
      return;
    }
    const newValue = Number(e.currentTarget.value);
    if (!newValue) {
      setCount(1);
      return;
    }
    if (newValue >= 100) {
      setCount(99);
      return;
    }
    setCount(newValue);
  };

  const handleBlurInput = (e: FocusEvent<HTMLInputElement>) => {
    const newValue = Math.max(Math.min(Number(e.currentTarget.value), 99), 1);
    setCount(newValue);
  };

  useEffect(() => {
    if (count === '') {
      return;
    }

    if (onChange) {
      onChange(count);
    }
  }, [count, onChange]);
  return (
    <div className={cn('wrapper')}>
      <button type='button' className={cn('button', 'left')} onClick={() => handleClickButton('decrease')}>
        <DashIcon width={12} height={14} className={cn('icon', { disabled: Number(count) <= 1 })} />
      </button>
      <Input
        className={cn('input')}
        ref={ref}
        value={count}
        onChange={handleChange}
        onBlur={handleBlurInput}
        {...rest}
      />
      <button
        type='button'
        className={cn('button', 'right', { disabled: Number(count) >= 99 })}
        onClick={() => handleClickButton('increase')}
      >
        <CrossIcon width={12.5} height={12.5} className={cn('icon', { disabled: Number(count) >= 99 })} />
      </button>
    </div>
  );
});
