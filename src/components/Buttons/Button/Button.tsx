import classNames from 'classnames/bind';
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ElementType, ReactNode } from 'react';
import styles from './Button.module.scss';

const cn = classNames.bind(styles);

const BUTTON_COLOR = {
  BACKGROUND_GRAY_40: 'background-gray-40',
  BACKGROUND_PRIMARY: 'background-primary',
  BACKGROUND_PRIMARY_60: 'background-primary-60',
  OUTLINE_GRAY_40: 'outline-gray-40',
  OUTLINE_PRIMARY: 'outline-primary',
  OUTLINE_PRIMARY_60: 'outline-primary-60',
} as const;

interface ButtonCustomProps {
  backgroundColor?: ButtonColorType;
  hoverColor?: ButtonColorType;
  radius?: 4 | 8;
  width?: 72 | 90 | 120 | 154 | 199 | 320;
  fontSize?: 14 | 18 | 20 | 24;
  paddingVertical?: 2 | 8 | 20;
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

type ButtonPropsAsButton = ButtonCustomProps & ButtonHTMLAttributes<HTMLButtonElement>;
type ButtonPropsAsAnchor = ButtonCustomProps & AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonProps = {
  as?: ElementType;
} & (ButtonPropsAsButton | ButtonPropsAsAnchor);

type ButtonColorType = (typeof BUTTON_COLOR)[keyof typeof BUTTON_COLOR];

/**
 * button component documentation
 * @param {ButtonColorType} [props.backgroundColor] - 버튼에 적용할 디자인
 * @param {ButtonColorType} [props.hoverColor] - 버튼에 hover 시 적용할 디자인
 * @param {number} [props.redius] - 버튼의 border-radius 크기 / 4px or 8px
 * @param {number} [props.width] - 너비의 크기 px 단위 / 'parent-full'은 100%
 * @param {number} [props.fontSize] - 폰트 크기 px 단위
 * @param {number} [props.paddingVertical] - 수직 방향 패딩 값
 * @param {funtion} [props.onClick] - 버튼 클릭 시 실행할 함수
 * @param {JSX.Element} [props.children] - 버튼 안에 들어갈 내용
 * @returns {JSX.Element}
 */

export default function Button({
  backgroundColor = BUTTON_COLOR.BACKGROUND_PRIMARY,
  hoverColor,
  radius = 8,
  width,
  fontSize = 18,
  paddingVertical = 20,
  children,
  className,
  as: Component = 'button',
  ...rest
}: ButtonProps) {
  const widthClassName = width ? `width-${width}` : 'parent-full';
  const combinedClassName = cn(
    widthClassName,
    backgroundColor,
    className,
    'common-style',
    `radius-${radius}`,
    `hover-${hoverColor}`,
    `font-${fontSize}`,
    `padding-${paddingVertical}`,
  );
  return (
    <Component className={combinedClassName} {...rest}>
      {children}
    </Component>
  );
}
