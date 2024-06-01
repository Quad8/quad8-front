import classNames from 'classnames/bind';
import { TextareaHTMLAttributes, forwardRef } from 'react';
import styles from './Textarea.module.scss';

const cn = classNames.bind(styles);

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: 'sm' | 'md' | 'lg';
}

export default forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { size, minLength, maxLength, ...rest },
  ref,
) {
  return (
    <textarea
      ref={ref}
      className={cn('default', size)}
      autoCapitalize="off"
      minLength={minLength}
      maxLength={maxLength}
      {...rest}
    />
  );
});
