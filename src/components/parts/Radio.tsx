import classNames from 'classnames/bind';
import { InputHTMLAttributes, forwardRef } from 'react';
import styles from './Radio.module.scss';

const cn = classNames.bind(styles);

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  isError?: boolean;
}

export default forwardRef<HTMLInputElement, RadioProps>(function Radio({ id, value, checked, isError, ...rest }, ref) {
  return (
    <label className={cn('radio-wrapper')} htmlFor={id}>
      <input
        className={cn('radio', { red: isError })}
        ref={ref}
        id={id}
        type='radio'
        value={value}
        checked={checked}
        {...rest}
      />
      {value}
    </label>
  );
});
