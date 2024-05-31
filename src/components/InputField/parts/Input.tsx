import classNames from 'classnames/bind';
import { InputHTMLAttributes, forwardRef } from 'react';
import styles from './Input.module.scss';

const cn = classNames.bind(styles);

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  isError?: boolean;
}

export default forwardRef<HTMLInputElement, InputProps>(function Input({ size = 'md', isError, ...rest }, ref) {
  const className = cn('default', size, { red: isError });

  return <input className={className} ref={ref} {...rest} />;
});
