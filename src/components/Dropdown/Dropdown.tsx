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
  maxHeight?: 4 | 6 | 8;
}

export default forwardRef<HTMLInputElement, DropdownProps>(function Dropdown(
  { type = 'text', sizeVariant = 'sm', options, className, onClick, onChange, value, isDate, maxHeight, ...rest },
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
    e.stopPropagation();

    const inputValue = e.currentTarget.value;
    setDropdownValue(inputValue);
    setIsDropdownOpen(false);
    setIsTextFieldVisible(inputValue === '직접 입력');

    onChange?.(inputValue);

    if (onClick) {
      onClick(e);
    }
  };

  const dropdownStyleClass = maxHeight ? `max-height-${maxHeight}` : '';

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
            [dropdownStyleClass]: maxHeight,
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
