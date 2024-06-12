'use client';

import classNames from 'classnames/bind';
import { ChangeEvent, TextareaHTMLAttributes, forwardRef, useState } from 'react';
import { Label, Textarea } from '../parts';
import styles from './TextField.module.scss';

const cn = classNames.bind(styles);

interface TextFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  sizeVariant?: 'md' | 'option';
  label?: string;
  labelSize?: 'sm' | 'md' | 'lg';
}

/**
 * TextField component documentation
 *
 * @param {object} props - 컴포넌트의 속성
 * @param {number} [props.rows=7] - 텍스트 영역의 기본 행 수
 * @param {string} [props.label] - 텍스트 영역의 레이블 텍스트
 * @param {string} [props.labelSize='lg'] - 레이블 사이즈, 기본값 'lg'
 * @param {number} [props.minLength=20] - 입력할 수 있는 최소 문자 수
 * @param {number} [props.maxLength=200] - 입력할 수 있는 최대 문자 수
 * @param {string} [props.sizeVariant='md'] - 텍스트 영역의 크기
 * 'md' = 페이지 안에서 사용하는 유일 사이즈
 * 'option' = Dropdown value가 '직접 입력' 일 때 나오는 textarea
 * @returns {JSX.Element} 렌더링된 텍스트 필드 컴포넌트
 */

export default forwardRef<HTMLTextAreaElement, TextFieldProps>(function TextField(
  { id, rows = 7, label, minLength = 20, maxLength = 200, sizeVariant = 'md', labelSize = 'lg', ...rest },
  ref,
) {
  const [currentLength, setCurrentLength] = useState(0);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentLength(e.target.value.length);
    if (rest.onChange) {
      rest.onChange(e);
    }
  };

  return (
    <div className={cn('default', sizeVariant)}>
      {label && (
        <Label htmlFor={id} sizeVariant={labelSize}>
          {label}
        </Label>
      )}
      <Textarea
        sizeVariant={sizeVariant}
        ref={ref}
        id={id}
        rows={rows}
        minLength={minLength}
        maxLength={maxLength}
        onChange={handleChange}
        {...rest}
      />
      <div className={cn('character-limit')}>
        {currentLength} / {maxLength}
      </div>
    </div>
  );
});
