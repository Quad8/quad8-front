'use client';

import { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import CarmeraIcon from '@/public/svgs/camera.svg';
import DeleteImageIcon from '@/public/svgs/deleteImage.svg';
import classNames from 'classnames/bind';
import Image from 'next/image';
import React, { useState } from 'react';
import styles from './ImageInput.module.scss';

const cn = classNames.bind(styles);

export default function ImageInput() {
  const [selectedImageFile, setSelectedImageFile] = useState<string[]>([]);
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (selectedImageFile.length >= 4 || !files) {
      alert('이미지 4개 이상 불가');
      return;
    }
    const imageUrl = URL.createObjectURL(files[0]);
    setSelectedImageFile((prev) => [...prev, imageUrl]);
  };
  const handleClickDeleteImage = (clickedImageIndex: number) => {
    setSelectedImageFile((prev) => [...prev.slice(0, clickedImageIndex), ...prev.slice(clickedImageIndex + 1)]);
  };
  return (
    <div className={cn('container')}>
      <div className={cn('title-div')}>
        <h1 id={cn('title')}>사진/동영상 첨부</h1>
        <h3 id={cn('sub-title')}>최대 4장</h3>
      </div>
      <div>
        <form className={cn('input-div')}>
          {selectedImageFile.length >= 4 || (
            <label htmlFor="imageInput" className={cn('label-input', `${selectedImageFile && 'width-quater'}`)}>
              <CarmeraIcon />
            </label>
          )}
          <input type='file' className={cn('input-image-input')} id='imageInput' onChange={handleChangeImage} />
          {selectedImageFile &&
            selectedImageFile.map((imageUrl, index) => (
              <div key={imageUrl} className={cn('image-div')}>
                <Image alt="선택된 이미지" src={imageUrl} fill id={cn('image')} />
                <DeleteImageIcon className={cn('delete-image-icon')} onClick={() => handleClickDeleteImage(index)} />
                {index === 0 && <div className={cn('main-image')}>대표</div>}
              </div>
            ))}
        </form>
      </div>
    </div>
  );
}
