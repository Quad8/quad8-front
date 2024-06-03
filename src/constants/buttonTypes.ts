export const BUTTON_COLOR = {
  BACKGROUND_GRAY_40: 'background-gray-40',
  BACKGROUND_PRIMARY: 'background-primary',
  BACKGROUND_PRIMARY_60: 'background-primary-60',
  OUTLINE_GRAY_40: 'outline-gray-40',
  OUTLINE_PRIMARY: 'outline-primary',
  OUTLINE_PRIMARY_60: 'outline-primary-60',
} as const;

export const BUTTON_RADIUS = {
  RADIUS_0: 'radius-0',
  RADIUS_4: 'radius-4',
  RADIUS_8: 'radius-8',
} as const;

export const BUTTON_WIDTH = {
  PARENT_FULL: '100%',
  small: '12rem',
  medium: '15.4rem',
  big: '32rem',
} as const;

export type ButtonRadiusType = (typeof BUTTON_RADIUS)[keyof typeof BUTTON_RADIUS];
export type ButtonColorType = (typeof BUTTON_COLOR)[keyof typeof BUTTON_COLOR];
export type ButtonWidthType = (typeof BUTTON_WIDTH)[keyof typeof BUTTON_WIDTH];
