'use client';

import classNames from 'classnames/bind';
import Image from 'next/image';
import { useState } from 'react';
import styles from './Thumbnail.module.scss';

const cn = classNames.bind(styles);

interface ThumbnailProps {
  imageList: {
    id: number;
    imgUrl: string;
  }[];
}

export default function Thumbnail({ imageList }: ThumbnailProps) {
  const [currentImage, setCurrentImage] = useState(imageList[0].imgUrl);

  const handleClickImage = (value: string) => {
    setCurrentImage(value);
  };

  return (
    <div className={cn('image-container')}>
      <Image className={cn('big-image')} src={currentImage} alt='썸네일' width={948} height={629} />
      <div>
        {imageList.map((item) => (
          <Image
            key={item.id}
            className={cn('small-image')}
            src={item.imgUrl}
            alt='썸네일'
            width={115}
            height={115}
            onClick={() => handleClickImage(item.imgUrl)}
          />
        ))}
      </div>
    </div>
  );
}
