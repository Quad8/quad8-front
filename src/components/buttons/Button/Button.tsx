import classNames from 'classnames/bind';
import { ButtonColorType } from '@/constants/buttonTypes';
import styles from './Button.module.scss';

const cn = classNames.bind(styles);

interface ButtonProps {
  color: ButtonColorType;
}

export default function Button({ color }: ButtonProps) {
  return (
    <button className={cn('container', `${color}`)} type="button">
      Button
    </button>
  );
}
