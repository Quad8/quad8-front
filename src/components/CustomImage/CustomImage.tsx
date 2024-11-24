'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { errorImg } from '@/public/index';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { getValidImage, isValidImageURL } from '@/utils/checkValidImage';

interface CustomImageProps extends ImageProps {
  errorSrc?: string | StaticImport;
}

export default function CustomImage(props: CustomImageProps) {
  const { alt, src, errorSrc, ...imageProps } = props;
  const [imgSrc, setImgSrc] = useState(getValidImage(src, errorImg, errorSrc));

  const handleImageError = () => {
    if (errorSrc) {
      setImgSrc((prev) => {
        if (prev !== errorSrc || isValidImageURL(errorSrc)) {
          return errorSrc;
        }
        return errorImg;
      });
      return;
    }
    setImgSrc(errorImg);
  };
  return <Image alt={alt} src={imgSrc} {...imageProps} onError={handleImageError} />;
}
