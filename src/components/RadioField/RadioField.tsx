'use client';

import classNames from 'classnames/bind';
import { InputHTMLAttributes, forwardRef, useEffect, useState } from 'react';
import { ErrorMessage, Radio } from '../parts';
import styles from './RadioField.module.scss';

const cn = classNames.bind(styles);

interface Option {
  label: string;
  value: string;
}

interface RadioFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
  options: Option[];
  errorMessage?: string;
  defaultValue?: string;
}

export default forwardRef<HTMLInputElement, RadioFieldProps>(function RadioField(
  { label, options, errorMessage, defaultValue, className, ...rest },
  ref,
) {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(defaultValue);

  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <fieldset className={cn('radio-field', className)}>
      <legend className={cn('label')}>{label}</legend>
      <div className={cn('radio-box')}>
        {options.map((option) => (
          <Radio
            ref={ref}
            key={option.value}
            id={option.value}
            value={option.value}
            isChecked={selectedValue === option.value}
            isError={!!errorMessage}
            {...rest}
          >
            {option.label}
          </Radio>
        ))}
      </div>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </fieldset>
  );
});
