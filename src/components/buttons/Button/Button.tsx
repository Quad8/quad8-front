import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cn = classNames.bind(styles);

export const BUTTON_COLOR = {
  BACKGROUND_GRAY_00: 'background-gray-00',
  BACKGROUND_MAIN_01: 'background-main-01',
  OUTLINE_GRAY_00: 'outline-gray-00',
  OUTLINE_MAIN: 'outline-main-01',
} as const;

export const BUTTON_BORDER = {
  BORDER_0: 'border-0',
  BORDER_4: 'border-4',
  BORDER_8: 'border-8',
} as const;

const BUTTON_WIDTH = {
  DEFAULT: '100%',
  BORDER_4: 'border-4',
} as const;

type ButtonBorderType = (typeof BUTTON_BORDER)[keyof typeof BUTTON_BORDER];
type ButtonColorType = (typeof BUTTON_COLOR)[keyof typeof BUTTON_COLOR];
type ButtonWidthType = (typeof BUTTON_WIDTH)[keyof typeof BUTTON_WIDTH];

interface ButtonProps {
  color: ButtonColorType;
  border?: ButtonBorderType;
  width?: ButtonWidthType;
}

export default function Button({ color, border = BUTTON_BORDER.BORDER_0, width = BUTTON_WIDTH.DEFAULT }: ButtonProps) {
  return (
    <button className={cn(`${color}`, `${border}`, `${width}`)} type="button">
      Button
    </button>
  );
}
