export const BUTTON_COLOR = {
  BACKGROUND_GRAY: 'background-gray',
  OUTLINE_GRAY: 'outline-gray',
  BACKGROUND_BLUE: 'background-blue',
  OUTLINE_BLUE: 'outline-blue',
} as const;

export type ButtonColorType = (typeof BUTTON_COLOR)[keyof typeof BUTTON_COLOR];

export const BUTTON_BORDER = {
  BACKGROUND_GRAY: 'background-gray',
  OUTLINE_GRAY: 'outline-gray',
  BACKGROUND_BLUE: 'background-blue',
  OUTLINE_BLUE: 'outline-blue',
} as const;

export type ButtonBorderType = (typeof BUTTON_BORDER)[keyof typeof BUTTON_BORDER];
