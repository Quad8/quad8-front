'use client';

import { useOutsideClick } from '@/hooks/useOutsideClick';
import classNames from 'classnames/bind';
import { InputHTMLAttributes, forwardRef, useRef, useState } from 'react';
import { Input, SuffixIcon } from '../parts';
import styles from './Dropdown.module.scss';

const cn = classNames.bind(styles);

interface DropdownProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  options: string[];
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Dropdown component documentation
 *
 * @param {object} props - 컴포넌트의 속성
 * @param {string} [props.type='text'] - 입력 필드의 타입, 기본값은 'text'
 * @param {string} [props.size='sm'] - 드롭다운의 크기, 'sm', 'md', 'lg' 중 하나
 * @param {string[]} props.options - 선택할 수 있는 옵션 목록
 * @param {string} [props.placeholder] - placeholder 텍스트로 기본값 설정
 * @returns {JSX.Element} 렌더링된 드롭다운 컴포넌트
 */

export default forwardRef<HTMLInputElement, DropdownProps>(function Dropdown(
  { type = 'text', size = 'sm', options, ...rest },
  ref,
) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState<string>('');
  const DropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(DropdownRef, () => {
    setIsDropdownOpen(false);
  });

  const handleInputFocus = () => {
    setIsDropdownOpen(true);
  };

  const handleOptionClick = (option: string) => {
    setDropdownValue(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className={cn('dropdown')} ref={DropdownRef} onFocus={handleInputFocus}>
      <div className={cn('input-wrapper')}>
        <Input ref={ref} isSelect type={type} size={size} value={dropdownValue} readOnly {...rest} />
        <SuffixIcon icon='arrow' isOpen={isDropdownOpen} />
      </div>
      {isDropdownOpen && (
        <ul className={cn('option-box')}>
          {rest.placeholder && (
            <li>
              <button type='button' className={cn('option', size)} onClick={() => handleOptionClick('')}>
                {rest.placeholder}
              </button>
            </li>
          )}
          {options.map((option) => (
            <li key={option}>
              <button type='button' className={cn('option', size)} onClick={() => handleOptionClick(option)}>
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});
