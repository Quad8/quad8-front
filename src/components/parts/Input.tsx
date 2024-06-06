import classNames from 'classnames/bind';
import { InputHTMLAttributes, forwardRef } from 'react';
import styles from './Input.module.scss';

const cn = classNames.bind(styles);

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  sizeVariant?: 'xs' | 'sm' | 'md' | 'lg';
  isError?: boolean;
  isSelect?: boolean;
}

export default forwardRef<HTMLInputElement, InputProps>(function Input(
  { sizeVariant, type, value, isError, isSelect, ...rest },
  ref,
) {
  const className = cn('default', sizeVariant, type, {
    red: isError,
    select: isSelect,
    'dropdown-textarea-case': value === '직접 입력',
  });

  return <input className={className} ref={ref} type={type} value={value} {...rest} />;
});
