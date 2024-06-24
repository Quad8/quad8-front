'use client';

import classNames from 'classnames/bind';
import { InputHTMLAttributes, MouseEvent, forwardRef, useState } from 'react';
import { ErrorMessage, Input, Label, SuffixIcon, SuffixUnit } from '../parts';
import styles from './InputFiled.module.scss';

const cn = classNames.bind(styles);

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  sizeVariant?: 'sm' | 'md' | 'lg' | 'header';
  className?: string;
  label?: string;
  labelSize?: 'sm' | 'md' | 'lg';
  errorMessage?: string;
  suffixIcon?: 'search' | 'eye';
  suffixUnit?: '원';
  currentLength?: number;
}

const PHONE_PREFIX = '010';
const NICKNAME_MAX_LENGTH = 16;

/**
 * InputField component documentation
 *
 * @param {object} props - 컴포넌트의 속성
 * @param {string} [props.id] - 입력 필드의 고유 식별자
 * @param {string} [props.type='text'] - 입력 필드의 타입, 기본값은 'text'
 * @param {string} [props.sizeVariant='md'] - 입력 필드의 크기, 'sm', 'md', 'lg' 중 하나
 * @param {string} [props.label] - 입력 필드의 레이블 텍스트
 * @param {string} [props.errorMessage] - 에러 메시지 텍스트
 * @param {string} [props.suffixIcon] - 접미사 아이콘, 'search' 또는 'eye'
 * @param {string} [props.suffixUnit='원'] - 입력 필드의 접미사 단위, 기본값은 '원'
 * @returns {JSX.Element} 렌더링된 입력 필드 컴포넌트
 */

export default forwardRef<HTMLInputElement, InputFieldProps>(function InputField(
  {
    id,
    type = 'text',
    sizeVariant = 'md',
    label,
    className,
    errorMessage,
    suffixIcon,
    suffixUnit,
    labelSize,
    currentLength,
    ...rest
  },
  ref,
) {
  const [inputType, setInputType] = useState(type);

  const isPhone = label === '휴대폰 번호' || label === '연락처';
  const isBirth = label === '생년월일';
  const isNickname = id === 'nickname';
  const isTitle = label === '제목';
  const isNumber = !!suffixUnit;

  const handleSuffixEyeIconClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setInputType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  const combinedClassName = cn('default', sizeVariant, { phone: isPhone });

  return (
    <div className={combinedClassName}>
      {label && (
        <Label htmlFor={id} sizeVariant={labelSize || sizeVariant}>
          {label}
        </Label>
      )}
      <div className={cn('input-wrapper')}>
        {isPhone && (
          <Input
            id={id}
            type={inputType}
            sizeVariant={sizeVariant}
            value={PHONE_PREFIX}
            isPhonePrefix={isPhone}
            disabled
          />
        )}
        <Input
          id={id}
          type={inputType}
          sizeVariant={sizeVariant}
          isError={!!errorMessage}
          isBirth={isBirth}
          isPhone={isPhone}
          isNickname={isNickname}
          isNumber={isNumber}
          ref={ref}
          className={className}
          {...rest}
        />
        {(isNickname || isTitle) && (
          <div className={cn('current-length', isTitle && 'title-current-length')}>
            {currentLength} / {NICKNAME_MAX_LENGTH}
          </div>
        )}
        {suffixUnit && <SuffixUnit unit={suffixUnit} />}
        {suffixIcon && (
          <SuffixIcon
            icon={suffixIcon}
            onClick={suffixIcon === 'eye' ? handleSuffixEyeIconClick : undefined}
            type={inputType}
          />
        )}
      </div>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
});
