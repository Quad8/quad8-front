import { isNumberAllowedKey } from '@/libs';
import { formatBirthDate } from '@/libs/formatBirthDate';
import classNames from 'classnames/bind';
import { InputHTMLAttributes, KeyboardEvent, forwardRef, useEffect, useState } from 'react';
import styles from './Input.module.scss';

const cn = classNames.bind(styles);

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  sizeVariant?: 'xs' | 'sm' | 'md' | 'lg' | 'header';
  isError?: boolean;
  isSelect?: boolean;
  isOption?: boolean;
  isChecked?: boolean;
  isPhone?: boolean;
  isPhonePrefix?: boolean;
  isBirth?: boolean;
  isNickname?: boolean;
  isNumber?: boolean;
  className?: string;
}

export default forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    sizeVariant,
    type,
    value,
    isError,
    isSelect,
    isOption,
    isChecked,
    isPhonePrefix,
    isPhone,
    isBirth,
    isNickname,
    isNumber,
    className,
    ...rest
  },
  ref,
) {
  const [maxLength, setMaxLength] = useState<number | undefined>(undefined);
  const [currectValue, setCurrectValue] = useState(value);

  useEffect(() => {
    if (isPhone) {
      setMaxLength(9);
      return;
    }
    if (isNickname) {
      setMaxLength(16);
      return;
    }

    setMaxLength(undefined);
  }, [isPhone, isNickname]);

  useEffect(() => {
    if (isBirth && typeof value === 'string') {
      setCurrectValue(formatBirthDate(value));
      return;
    }

    setCurrectValue(value);
  }, [isBirth, value]);

  const formattedPlaceholder = isBirth ? 'YYYY / MM / DD' : rest.placeholder;

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((isPhone || isNumber) && !isNumberAllowedKey(e.key)) {
      e.preventDefault();
    }
  };

  const combinedClassName = cn('default', sizeVariant, type, className, {
    red: isError,
    select: isSelect,
    option: isOption,
    checked: isChecked,
    phone: isPhonePrefix,
    'dropdown-textarea-case': value === '직접 입력',
  });

  return (
    <input
      className={combinedClassName}
      ref={ref}
      type={type}
      maxLength={maxLength}
      value={currectValue}
      placeholder={formattedPlaceholder}
      onKeyDown={handleKeyPress}
      {...rest}
    />
  );
});
