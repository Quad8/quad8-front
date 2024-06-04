import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import { BUTTON_COLOR } from '@/constants/buttonTypes';
import styles from './Button.module.scss';

type ButtonColorType = (typeof BUTTON_COLOR)[keyof typeof BUTTON_COLOR];

const cn = classNames.bind(styles);

interface ButtonProps {
  backgroundColor?: ButtonColorType;
  hoverColor?: ButtonColorType;
  radius?: 4 | 8;
  width?: 'parent-full' | 72 | 90 | 120 | 154 | 320;
  fontSize?: 14 | 18 | 20 | 24;
  paddingVertical?: 8 | 20;
  onClick: () => void;
  children: ReactNode;
}

export default function Button({
  backgroundColor = BUTTON_COLOR.BACKGROUND_PRIMARY,
  hoverColor,
  radius = 8,
  width = 'parent-full',
  fontSize = 18,
  paddingVertical = 20,
  onClick,
  children,
}: ButtonProps) {
  const widthClassName = width === 'parent-full' ? 'parent-full' : `width-${width}`;
  const className = cn(
    widthClassName,
    backgroundColor,
    'common-style',
    `radius-${radius}`,
    `hover-${hoverColor}`,
    `font-${fontSize}`,
    `padding-${paddingVertical}`,
  );
  return (
    <button className={className} type='button' onClick={onClick}>
      {children}
    </button>
  );
}
