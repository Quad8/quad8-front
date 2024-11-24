import type { OptionRatio } from '@/types/productReviewType';

export const getMaxKey = (options: OptionRatio) => {
  return Object.keys(options).reduce((maxKey, key) => {
    return options[key] > options[maxKey] ? key : maxKey;
  });
};
