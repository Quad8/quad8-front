import classNames from 'classnames/bind';
import { InputHTMLAttributes, forwardRef } from 'react';
import Label from './Label';

import styles from './Radio.module.scss';

const cn = classNames.bind(styles);

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
  isChecked?: boolean;
}

export default forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { id, isChecked, value, isError, onChange, children, ...rest },
  ref,
) {
  return (
    <Label htmlFor={id} sizeVariant='md'>
      <input
        className={cn('radio', { red: isError })}
        ref={ref}
        id={id}
        type='radio'
        checked={isChecked || undefined}
        value={value}
        {...rest}
      />
      {children}
    </Label>
  );
});
