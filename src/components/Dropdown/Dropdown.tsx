'use client';

import classNames from 'classnames/bind';
import { ChangeEvent, InputHTMLAttributes, forwardRef, useState } from 'react';
import { SuffixIcon } from '../InputField/parts';
import styles from './Dropdown.module.scss';

const cn = classNames.bind(styles);

interface DropdownProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  options: string[];
  size?: 'sm' | 'md' | 'lg';
}

export default forwardRef<HTMLInputElement, DropdownProps>(function Dropdown(
  { type = 'text', size = 'sm', options, ...rest },
  ref,
) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState('');

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200);
  };

  const handleOptionClick = (option: string) => {
    setDropdownValue(option);
    setIsDropdownOpen(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDropdownValue(e.target.value);
  };

  return (
    <div className={cn('dropdown')} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className={cn('input-wrapper')}>
        <input
          ref={ref}
          type={type}
          className={cn('default', size)}
          value={dropdownValue}
          onChange={handleInputChange}
          readOnly
          {...rest}
        />
        <SuffixIcon icon="arrow" isOpen={isDropdownOpen} />
      </div>
      {isDropdownOpen && (
        <ul className={cn('option-box')}>
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
