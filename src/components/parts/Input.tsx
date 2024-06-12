import classNames from 'classnames/bind';
import { InputHTMLAttributes, forwardRef } from 'react';
import styles from './Input.module.scss';

const cn = classNames.bind(styles);

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  sizeVariant?: 'xs' | 'sm' | 'md' | 'lg' | 'header';
  isError?: boolean;
  isSelect?: boolean;
  isOption?: boolean;
  isChecked?: boolean;
  className?: string;
}

export default forwardRef<HTMLInputElement, InputProps>(function Input(
  { sizeVariant, type, value, isError, isSelect, isOption, isChecked, className, ...rest },
  ref,
) {
  const combinedClassName = cn('default', sizeVariant, type, className, {
    red: isError,
    select: isSelect,
    option: isOption,
    checked: isChecked,

    'dropdown-textarea-case': value === '직접 입력',
  });

  return <input className={combinedClassName} ref={ref} type={type} value={value} {...rest} />;
});
