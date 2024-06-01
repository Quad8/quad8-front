import classNames from 'classnames/bind';
import { ChangeEvent, TextareaHTMLAttributes, forwardRef, useState } from 'react';
import { Label, Textarea } from '../parts';
import styles from './TextField.module.scss';

const cn = classNames.bind(styles);

interface TextFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export default forwardRef<HTMLTextAreaElement, TextFieldProps>(function TextField(
  { id, rows = 4, label, minLength = 20, maxLength = 200, size = 'md', ...rest },
  ref,
) {
  const [currentLength, setCurrentLength] = useState(0);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentLength(e.target.value.length);
    if (rest.onChange) {
      rest.onChange(e);
    }
  };

  return (
    <div className={cn('default', size)}>
      {label && (
        <Label htmlFor={id} size='lg'>
          {label}
        </Label>
      )}
      <Textarea
        size={size}
        ref={ref}
        id={id}
        rows={rows}
        minLength={minLength}
        maxLength={maxLength}
        onChange={handleChange}
        {...rest}
      />
      <div className={cn('character-limit')}>
        {currentLength} / {maxLength}
      </div>
    </div>
  );
});
