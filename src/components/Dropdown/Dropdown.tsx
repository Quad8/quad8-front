'use client';

import classNames from 'classnames/bind';
import { InputHTMLAttributes, forwardRef, useState } from 'react';
import { SuffixIcon } from '../parts';
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

  const handleInputFocus = () => {
    setIsDropdownOpen(true);
  };

  const handleDropdownBlur = () => {
    setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200);
  };

  const handleOptionClick = (option: string) => {
    setDropdownValue(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className={cn('dropdown')} onBlur={handleDropdownBlur}>
      <div className={cn('input-wrapper')}>
        <input
          ref={ref}
          type={type}
          className={cn('default', size)}
          value={dropdownValue}
          onFocus={handleInputFocus}
          readOnly
          {...rest}
        />
        <SuffixIcon icon="arrow" isOpen={isDropdownOpen} />
      </div>
      {isDropdownOpen && (
        <ul className={cn('option-box')}>
          {rest.placeholder && (
            <li>
              <button type="button" className={cn('option', size)} onClick={() => handleOptionClick('')}>
                {rest.placeholder}
              </button>
            </li>
          )}
          {options.map((option) => (
            <li key={option}>
              <button type="button" className={cn('option', size)} onClick={() => handleOptionClick(option)}>
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});
