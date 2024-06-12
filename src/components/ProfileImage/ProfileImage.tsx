'use client';

import { useState, ChangeEvent } from 'react';
import classNames from 'classnames/bind';
import Image, { StaticImageData } from 'next/image';
import defaultImage from '@/public/images/kedeukProfile.png';
import CameraIcon from '@/public/svgs/camera.svg';
import styles from './ProfileImage.module.scss';

const cn = classNames.bind(styles);

type ProfileImageProp = {
  profile?: StaticImageData;
  width?: number;
  height?: number;
  isEditable?: boolean;
};

export default function ProfileImage({ profile, width = 64, height = 64, isEditable = false }: ProfileImageProp) {
  const [currentImageFile, setCurrentImageFile] = useState<string | null | StaticImageData | undefined>(profile);
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) {
      return;
    }
    const imageUrl = URL.createObjectURL(files[0]);
    setCurrentImageFile(imageUrl);
  };

  return (
    <div className={cn('profile-image-wrapper')}>
      <Image
        src={currentImageFile || defaultImage}
        alt='프로필 이미지'
        width={width}
        height={height}
        className={cn('profile-image')}
      />
      {isEditable && (
        <div className={cn('image-input-wrapper')}>
          <label htmlFor='imageInput' className={cn('label')}>
            <CameraIcon fill='white' width={25} height={22.5} />
          </label>
          <input type='file' className={cn('file-input')} id='imageInput' onChange={handleChangeImage} />
        </div>
      )}
    </div>
  );
}
