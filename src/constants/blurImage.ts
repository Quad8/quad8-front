import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props';

export const IMAGE_BLUR: ImageBlurType = {
  placeholder: 'blur',
  blurDataURL:
    'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBAB  bWyZJf74GZgAAAABJRU5ErkJggg==',
};

interface ImageBlurType {
  placeholder: 'blur' | PlaceholderValue;
  blurDataURL: string;
}
