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
  placeholder?: string;
}

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
