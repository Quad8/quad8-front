import classNames from 'classnames/bind';
import { LabelHTMLAttributes, ReactNode } from 'react';
import styles from './Label.module.scss';

const cn = classNames.bind(styles);

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  sizeVariant?: 'sm' | 'md' | 'lg' | 'header';
  children: ReactNode;
  className?: string;
}

export default function Label({ sizeVariant, htmlFor, className, children }: LabelProps) {
  const combinedClassName = cn('default', sizeVariant, className);

  return (
    <label className={combinedClassName} htmlFor={htmlFor}>
      {children}
    </label>
  );
}
