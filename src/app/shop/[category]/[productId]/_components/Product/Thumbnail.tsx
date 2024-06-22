'use client';

import { BLUR_URL } from '@/constants/blurImageUrl';
import type { ThumbnailTypes } from '@/types/ProductTypes';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useState } from 'react';
import styles from './Thumbnail.module.scss';

const cn = classNames.bind(styles);

interface ThumbnailProps {
  imageList: ThumbnailTypes[];
}

export default function Thumbnail({ imageList }: ThumbnailProps) {
  const [currentImage, setCurrentImage] = useState(imageList[0].imgUrl);

  const handleClickImage = (value: string) => {
    setCurrentImage(value);
  };

  return (
    <div className={cn('image-container')}>
      <Image
        className={cn('big-image')}
        src={currentImage}
        alt='썸네일'
        width={948}
        height={629}
        priority
        placeholder='blur'
        blurDataURL={BLUR_URL}
      />
      <div>
        {imageList.map((item) => (
          <div key={item.id} className={cn('small-image-wrap')}>
            <Image
              className={cn('small-image')}
              src={item.imgUrl}
              alt='썸네일'
              fill
              sizes='115px'
              onClick={() => handleClickImage(item.imgUrl)}
              priority
              placeholder='blur'
              blurDataURL={BLUR_URL}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
