export const WRITE_EIDT_MODAL_TYPE = {
  writePost: 'writePost',
  writeCustomReview: 'writeCustomReview',
  editMyPost: 'editMyPost',
} as const;

export type WriteEditModalType = keyof typeof WRITE_EIDT_MODAL_TYPE;
