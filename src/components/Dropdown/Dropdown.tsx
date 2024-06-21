'use client';

import { useOutsideClick } from '@/hooks/useOutsideClick';
import classNames from 'classnames/bind';
import { InputHTMLAttributes, MouseEvent, forwardRef, useRef, useState } from 'react';
import TextField from '../TextField/TextField';
import { Input, SuffixIcon } from '../parts';
import styles from './Dropdown.module.scss';

const cn = classNames.bind(styles);

interface DropdownProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  options: string[];
  sizeVariant?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: (e: MouseEvent<HTMLInputElement>) => void;
  onChange?: (value: string) => void;
  isDate?: boolean;
}

/**
 * Dropdown component documentation
 *
 * @param {object} props - 컴포넌트의 속성
 * @param {string} [props.type='text'] - 입력 필드의 타입, 기본값은 'text'
 * @param {string} [props.sizeVariant='sm'] - 드롭다운의 사이즈:
 * 'xs' = sort Dropdown에서 사용,
 * 'sm' = 일반적인 상품 옵션 선택,
 * 'md', 'lg' 중 하나
 * @param {string[]} props.options - 선택할 수 있는 옵션 목록
 * @param {string} [props.placeholder] - placeholder 텍스트로 기본값 설정
 * placeholder값 선택시 inputValue === ('')
 * placeholder 설정하지 않을 시 options의 첫번째 값 렌더링
 * @param {string} props.value - 드롭다운의 현재 값
 * @param {function} props.onChange - 드롭다운 값이 변경될 때 호출되는 함수
 * @returns {JSX.Element} 렌더링된 드롭다운 컴포넌트
 *
 * <Controller
 *   name='dropdown'
 *   control={control}
 *   render={({ field: { onChange: onDropdownChange, value, ...field } }) => (
 *     <Dropdown options={대충 옵션값} onChange={onDropdownChange} value={value} {...field} />
 *   )}
 * />
 */

export default forwardRef<HTMLInputElement, DropdownProps>(function Dropdown(
  { type = 'text', sizeVariant = 'sm', options, className, onClick, onChange, value, isDate, ...rest },
  ref,
) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(!rest.placeholder ? options[0] : '');
  const [isTextFieldVisible, setIsTextFieldVisible] = useState(false);
  const DropdownRef = useRef<HTMLDivElement>(null);
  const TextareaRef = useRef<HTMLTextAreaElement>(null);

  useOutsideClick(DropdownRef, () => {
    if (TextareaRef.current?.value) {
      setDropdownValue(TextareaRef.current.value);
      options.push(TextareaRef.current.value);
      setIsTextFieldVisible(false);
      onChange?.(TextareaRef.current.value);
    }

    setIsDropdownOpen(false);
  });

  const handleDropdownClick = () => {
    setIsDropdownOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleOptionClick = (e: MouseEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    setDropdownValue(inputValue);
    setIsDropdownOpen(false);
    setIsTextFieldVisible(inputValue === '직접 입력');

    onChange?.(inputValue);

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div className={cn('dropdown', sizeVariant, className)} ref={DropdownRef}>
      <div className={cn('input-wrapper')}>
        <Input
          ref={ref}
          isSelect
          readOnly
          value={onChange ? value : dropdownValue}
          type={type}
          sizeVariant={sizeVariant}
          placeholder={rest.placeholder || options[0]}
          onClick={handleDropdownClick}
          {...rest}
        />
        {isDate ?? <SuffixIcon icon='arrow' isOpen={isDropdownOpen} />}
      </div>
      {isTextFieldVisible && (
        <TextField
          ref={TextareaRef}
          sizeVariant='option'
          rows={3}
          minLength={2}
          maxLength={30}
          placeholder='내용을 입력해 주세요'
        />
      )}
      {isDropdownOpen && (
        <ul
          className={cn('option-box', {
            'open-xs': isDropdownOpen,
            'open-other': isDropdownOpen && sizeVariant !== 'xs',
          })}
        >
          {rest.placeholder && (
            <li>
              <Input
                type='button'
                isOption
                isChecked={dropdownValue === rest.placeholder}
                sizeVariant={sizeVariant}
                value={rest.placeholder}
                readOnly
                onClick={handleOptionClick}
              />
            </li>
          )}
          {options.map((option) => (
            <li key={option}>
              <Input
                type='button'
                isOption
                isChecked={dropdownValue === option}
                sizeVariant={sizeVariant}
                value={option}
                readOnly
                onClick={handleOptionClick}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});
