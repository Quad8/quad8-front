'use client';

import classNames from 'classnames/bind';
import { InputHTMLAttributes, forwardRef, useState } from 'react';
import { ErrorMessage, Input, Label, SuffixIcon } from '../parts';
import SuffixUnit from '../parts/SuffixUnit';
import styles from './InputFiled.module.scss';

const cn = classNames.bind(styles);

interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  errorMessage?: string;
  hasSuffixIcon?: 'search' | 'eye';
  suffixUnit?: '원';
}

export default forwardRef<HTMLInputElement, InputFieldProps>(function InputField(
  { id, type = 'text', size = 'md', label, errorMessage, hasSuffixIcon, suffixUnit, ...rest },
  ref,
) {
  const [inputType, setInputType] = useState(type);

  const onSuffixEyeIconClick = () => {
    setInputType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  const className = cn('default', size);

  return (
    <div className={className}>
      {label && (
        <Label htmlFor={id} size={size}>
          {label}
        </Label>
      )}
      <div className={cn('input-wrapper')}>
        <Input id={id} type={inputType} size={size} isError={!!errorMessage} ref={ref} {...rest} />
        {suffixUnit && <SuffixUnit unit={suffixUnit} />}
        {hasSuffixIcon && (
          <SuffixIcon
            icon={hasSuffixIcon}
            onClick={hasSuffixIcon === 'eye' ? onSuffixEyeIconClick : undefined}
            type={inputType}
          />
        )}
      </div>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
});
