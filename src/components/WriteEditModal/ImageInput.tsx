'use client';

import { useState, ChangeEvent, MouseEvent } from 'react';
import Image from 'next/image';
import { CameraIcon, DeleteIcon } from '@/public/index';
import classNames from 'classnames/bind';
import styles from './ImageInput.module.scss';

const cn = classNames.bind(styles);

export default function ImageInput() {
  const [selectedImageFile, setSelectedImageFile] = useState<string[]>([]);

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (selectedImageFile.length >= 4 || !files) {
      return;
    }
    const imageUrl = URL.createObjectURL(files[0]);
    setSelectedImageFile((prev) => [...prev, imageUrl]);
  };

  const handleClickDeleteImage = (e: MouseEvent<HTMLDivElement>, clickedImageIndex: number) => {
    e.stopPropagation();
    setSelectedImageFile((prev) => [...prev.slice(0, clickedImageIndex), ...prev.slice(clickedImageIndex + 1)]);
  };
  return (
    <div className={cn('container')}>
      <div className={cn('title-wrapper')}>
        <h1 className={cn('title')}>사진/동영상 첨부하기</h1>
        <h3 className={cn('sub-title')}>최대 4장</h3>
      </div>
      <div>
        <form className={cn('input-wrapper')}>
          {selectedImageFile &&
            selectedImageFile.map((imageUrl, index) => (
              <div key={imageUrl} className={cn('image-wrapper')}>
                <Image alt='선택된 이미지' src={imageUrl} fill className={cn('image')} />
                <div className={cn('delete-image-icon')} onClick={(e) => handleClickDeleteImage(e, index)}>
                  <DeleteIcon fill='#ffffff' width={42} height={42} />
                </div>
                {index === 0 && (
                  <div className={cn('main-image-tag')}>
                    <span className={cn('main-tag-text')}>대표</span>
                  </div>
                )}
              </div>
            ))}
          {selectedImageFile.length < 4 && (
            <label htmlFor='imageInput' className={cn('label-input')}>
              <CameraIcon fill='#999999' width={46} height={40} />
            </label>
          )}
          <input type='file' className={cn('input-image-input')} id='imageInput' onChange={handleChangeImage} />
        </form>
      </div>
    </div>
  );
}
