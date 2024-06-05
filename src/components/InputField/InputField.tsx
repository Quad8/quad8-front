'use client';

import classNames from 'classnames/bind';
import { InputHTMLAttributes, forwardRef, useState } from 'react';
import { ErrorMessage, Input, Label, SuffixIcon, SuffixUnit } from '../parts';
import styles from './InputFiled.module.scss';

const cn = classNames.bind(styles);

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  sizeVariant?: 'sm' | 'md' | 'lg';
  label?: string;
  errorMessage?: string;
  hasSuffixIcon?: 'search' | 'eye';
  suffixUnit?: '원';
}

/**
 * InputField component documentation
 *
 * @param {object} props - 컴포넌트의 속성
 * @param {string} [props.id] - 입력 필드의 고유 식별자
 * @param {string} [props.type='text'] - 입력 필드의 타입, 기본값은 'text'
 * @param {string} [props.sizeVariant='md'] - 입력 필드의 크기, 'sm', 'md', 'lg' 중 하나
 * @param {string} [props.label] - 입력 필드의 레이블 텍스트
 * @param {string} [props.errorMessage] - 에러 메시지 텍스트
 * @param {string} [props.hasSuffixIcon] - 접미사 아이콘, 'search' 또는 'eye'
 * @param {string} [props.suffixUnit='원'] - 입력 필드의 접미사 단위, 기본값은 '원'
 * @returns {JSX.Element} 렌더링된 입력 필드 컴포넌트
 */

export default forwardRef<HTMLInputElement, InputFieldProps>(function InputField(
  { id, type = 'text', sizeVariant = 'md', label, errorMessage, hasSuffixIcon, suffixUnit, ...rest },
  ref,
) {
  const [inputType, setInputType] = useState(type);

  const onSuffixEyeIconClick = () => {
    setInputType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  const className = cn('default', sizeVariant);

  return (
    <div className={className}>
      {label && (
        <Label htmlFor={id} sizeVariant={sizeVariant}>
          {label}
        </Label>
      )}
      <div className={cn('input-wrapper')}>
        <Input id={id} type={inputType} sizeVariant={sizeVariant} isError={!!errorMessage} ref={ref} {...rest} />
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
