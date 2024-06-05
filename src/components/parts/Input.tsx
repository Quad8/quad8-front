import classNames from 'classnames/bind';
import { InputHTMLAttributes, forwardRef } from 'react';
import styles from './Input.module.scss';

const cn = classNames.bind(styles);

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isError?: boolean;
  isSelect?: boolean;
}

export default forwardRef<HTMLInputElement, InputProps>(function Input(
  { size, type, isError, isSelect, ...rest },
  ref,
) {
  const className = cn('default', size, type, { red: isError, select: isSelect });

  return <input className={className} ref={ref} type={type} {...rest} />;
});
