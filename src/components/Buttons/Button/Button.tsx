import classNames from 'classnames/bind';
import {
  ButtonColorType,
  ButtonRadiusType,
  ButtonWidthType,
  BUTTON_COLOR,
  BUTTON_WIDTH,
  BUTTON_RADIUS,
} from '@/constants/buttonTypes';
import styles from './Button.module.scss';

const cn = classNames.bind(styles);

interface ButtonProps {
  backgroundColor?: ButtonColorType;
  hoverColor?: ButtonColorType;
  radius?: ButtonRadiusType;
  width?: ButtonWidthType;
  onClick: () => void;
}

export default function Button({
  backgroundColor = BUTTON_COLOR.BACKGROUND_MAIN_01,
  hoverColor,
  radius = BUTTON_RADIUS.RADIUS_0,
  width = BUTTON_WIDTH.PARENT_FULL,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={cn('common-style', `${backgroundColor}`, `${radius}`, `${width}`, `hover-${hoverColor}`)}
      type="button"
      onClick={onClick}
    >
      Button
    </button>
  );
}
