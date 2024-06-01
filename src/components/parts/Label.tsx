import classNames from 'classnames/bind';
import { LabelHTMLAttributes, ReactNode } from 'react';
import styles from './Label.module.scss';

const cn = classNames.bind(styles);

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export default function Label({ size = 'md', htmlFor, children }: LabelProps) {
  const className = cn('default', size);

  return (
    <label className={className} htmlFor={htmlFor}>
      {children}
    </label>
  );
}
