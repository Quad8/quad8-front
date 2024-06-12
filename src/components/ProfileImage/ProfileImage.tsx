'use client';

import { useState, ChangeEvent } from 'react';
import classNames from 'classnames/bind';
import Image, { StaticImageData } from 'next/image';
import defaultImage from '@/public/images/kedeukProfile.png';
import CameraIcon from '@/public/svgs/camera.svg';
import styles from './ProfileImage.module.scss';

const cn = classNames.bind(styles);

type ProfileImageProp = {
  profileImage: StaticImageData | string | null;
  width?: number;
  height?: number;
  isEditable?: boolean;
};

export default function ProfileImage({ profileImage, width = 64, height = 64, isEditable = false }: ProfileImageProp) {
  const [currentImageFile, setCurrentImageFile] = useState<string | StaticImageData | null>(profileImage);
  const [isImageError, setIsImageError] = useState<boolean>(false);

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
        src={!isImageError && currentImageFile ? currentImageFile : defaultImage}
        alt='프로필 이미지'
        width={width}
        height={height}
        className={cn('profile-image')}
        onError={() => setIsImageError(true)}
      />
      {isEditable && (
        <div className={cn('image-input-wrapper')}>
          <label htmlFor='profileInput' className={cn('label')}>
            <CameraIcon fill='white' width={25} height={22.5} />
          </label>
          <input
            type='file'
            className={cn('file-input')}
            id='profileInput'
            onChange={handleChangeImage}
            accept='image/png, image/jpeg, image/jpg'
          />
        </div>
      )}
    </div>
  );
}
