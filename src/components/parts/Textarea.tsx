import classNames from 'classnames/bind';
import { TextareaHTMLAttributes, forwardRef } from 'react';
import styles from './Textarea.module.scss';

const cn = classNames.bind(styles);

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  sizeVariant?: 'md' | 'option';
}

export default forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea({ sizeVariant, ...rest }, ref) {
  return <textarea ref={ref} className={cn('default', sizeVariant)} autoCapitalize='off' {...rest} />;
});
