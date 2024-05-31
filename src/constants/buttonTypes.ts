export const BUTTON_COLOR = {
  BACKGROUND_GRAY_00: 'background-gray-00',
  OUTLINE_GRAY_00: 'outline-gray-00',
  BACKGROUND_MAIN_01: 'background-main-01',
  OUTLINE_MAIN: 'outline-main-01',
} as const;

export type ButtonColorType = (typeof BUTTON_COLOR)[keyof typeof BUTTON_COLOR];

export const BUTTON_BORDER = {
  BORDER_0: 'border-0',
  BORDER_4: 'border-4',
  BORDER_8: 'border-8',
} as const;

export type ButtonBorderType = (typeof BUTTON_BORDER)[keyof typeof BUTTON_BORDER];

export const BUTTON_WIDTH = {
  DEFAULT: '100%',
  BORDER_4: 'border-4',
} as const;

export type ButtonWidthType = (typeof BUTTON_WIDTH)[keyof typeof BUTTON_WIDTH];
