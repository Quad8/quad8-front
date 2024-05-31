import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cn = classNames.bind(styles);

export const BUTTON_COLOR = {
  BACKGROUND_GRAY_00: 'background-gray-00',
  BACKGROUND_GRAY_01: 'background-gray-01',
  BACKGROUND_MAIN_01: 'background-main-01',
  BACKGROUND_BLACE: 'background-black',
  OUTLINE_GRAY_00: 'outline-gray-00',
  OUTLINE_MAIN: 'outline-main-01',
} as const;

export const BUTTON_RADIUS = {
  RADIUS_0: 'radius-0',
  RADIUS_4: 'radius-4',
  RADIUS_8: 'radius-8',
} as const;

const BUTTON_WIDTH = {
  PARENT_FULL: '100%',
  BORDER_4: 'border-4',
} as const;

type ButtonRadiusType = (typeof BUTTON_RADIUS)[keyof typeof BUTTON_RADIUS];
type ButtonColorType = (typeof BUTTON_COLOR)[keyof typeof BUTTON_COLOR];
type ButtonWidthType = (typeof BUTTON_WIDTH)[keyof typeof BUTTON_WIDTH];

interface ButtonProps {
  backgroundColor: ButtonColorType;
  border?: ButtonRadiusType;
  width?: ButtonWidthType;
}

export default function Button({
  backgroundColor,
  border = BUTTON_RADIUS.RADIUS_0,
  width = BUTTON_WIDTH.PARENT_FULL,
}: ButtonProps) {
  return (
    <button className={cn('common-style', `${backgroundColor}`, `${border}`, `${width}`)} type="button">
      Button
    </button>
  );
}
