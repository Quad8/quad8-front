'use client';

import { useOutsideClick } from '@/hooks/useOutsideClick';
import classNames from 'classnames/bind';
import { InputHTMLAttributes, MouseEvent, forwardRef, useEffect, useRef, useState } from 'react';
import { Input, SuffixIcon } from '../parts';
import styles from './Dropdown.module.scss';

const cn = classNames.bind(styles);

interface DropdownProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onClick'> {
  options: string[];
  size?: 'xs' | 'sm' | 'md' | 'lg';
  onClick?: (option: string) => void;
  onDropdownClick?: (e: MouseEvent<HTMLInputElement>) => void;
}

/**
 * Dropdown component documentation
 *
 * @param {object} props - 컴포넌트의 속성
 * @param {string} [props.type='text'] - 입력 필드의 타입, 기본값은 'text'
 * @param {string} [props.size='sm'] - 드롭다운의 사이즈:
 * 'xs' = sort Dropdown에서 사용,
 * 'sm' = 일반적인 상품 옵션 선택,
 * 'md', 'lg' 중 하나
 * @param {string[]} props.options - 선택할 수 있는 옵션 목록
 * @param {string} [props.placeholder] - placeholder 텍스트로 기본값 설정
 * placeholder값 선택시 inputValue === ('')
 * placeholder 설정하지 않을 시 options의 첫번째 값 렌더링
 * @returns {JSX.Element} 렌더링된 드롭다운 컴포넌트
 */

export default forwardRef<HTMLInputElement, DropdownProps>(function Dropdown(
  { type = 'text', size = 'sm', options, onDropdownClick, onClick, ...rest },
  ref,
) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState<string>('');
  const DropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rest.placeholder) {
      setDropdownValue(options[0]);
    }
  }, [rest.placeholder, options]);

  useOutsideClick(DropdownRef, () => {
    setIsDropdownOpen(false);
  });

  const handleDropdownClick = (e: MouseEvent<HTMLInputElement>) => {
    setIsDropdownOpen((prevIsOpen) => !prevIsOpen);
    if (onDropdownClick) {
      onDropdownClick(e);
    }
  };

  const handleOptionClick = (option: string) => {
    setDropdownValue(option);
    setIsDropdownOpen(false);

    if (onClick) {
      onClick(option);
    }
  };

  return (
    <div className={cn('dropdown', size)} ref={DropdownRef}>
      <div className={cn('input-wrapper')}>
        <Input
          ref={ref}
          isSelect
          type={type}
          size={size}
          value={dropdownValue}
          placeholder={rest.placeholder || options[0]}
          readOnly
          onClick={handleDropdownClick}
          {...rest}
        />
        <SuffixIcon icon='arrow' isOpen={isDropdownOpen} />
      </div>
      {isDropdownOpen && (
        <ul className={cn('option-box', { 'open-xs': isDropdownOpen, 'open-other': isDropdownOpen && size !== 'xs' })}>
          {rest.placeholder && (
            <li>
              <button
                type='button'
                className={cn('option', size, { checked: dropdownValue === rest.placeholder })}
                onClick={() => handleOptionClick('')}
              >
                {rest.placeholder}
              </button>
            </li>
          )}
          {options.map((option) => (
            <li key={option}>
              <button
                type='button'
                className={cn('option', size, { checked: dropdownValue === option })}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});
