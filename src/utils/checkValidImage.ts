import { StaticImport } from 'next/dist/shared/lib/get-img-props';

const VALID_URL_PATTERN = /^(https?:\/\/[^\s/$.?#].[^\s]*|\/[^\s]*|data:image\/[^\s]*)$/i;

export const isValidImageURL = (src: string | StaticImport) => {
  if (typeof src === 'string') {
    return VALID_URL_PATTERN.test(src);
  }
  return true;
};

export const getValidImage = (
  src: string | StaticImport,
  errorImg: string | StaticImport,
  errorSrc?: string | StaticImport,
) => {
  if (isValidImageURL(src)) {
    return src;
  }
  if (errorSrc && isValidImageURL(errorSrc)) {
    return errorSrc;
  }
  return errorImg;
};
