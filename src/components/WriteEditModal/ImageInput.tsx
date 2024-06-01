'use client';

import Carmera from '@/public/svgs/camera.svg';
import DeleteImage from '@/public/svgs/deleteImage.svg';
import classNames from 'classnames/bind';
import Image from 'next/image';
import React, { useState } from 'react';
import styles from './ImageInput.module.scss';

export default function ImageInput() {
  const cn = classNames.bind(styles);

  const [selectedImageFile, setSelectedImageFile] = useState<string[]>([]);
  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedImageFile.length === 4) {
      alert('이미지 4개 이상 불가');
      return;
    }
    if (e.target.files) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImageFile([...selectedImageFile, imageUrl]);
    }
  };
  const handleClickDeleteImage = (clickedImageIndex: number) => {
    const updatedImageFile = [
      ...selectedImageFile.slice(0, clickedImageIndex),
      ...selectedImageFile.slice(clickedImageIndex + 1),
    ];
    setSelectedImageFile(updatedImageFile);
  };
  return (
    <div className={cn('container')}>
      <div className={cn('title-div')}>
        <h1 id={cn('title-h1')}>사진/동영상 첨부</h1>
        <h3 id={cn('sub-title-h3')}>최대 4장</h3>
      </div>
      <div>
        <form className={cn('input-div')}>
          {selectedImageFile.length >= 4 || (
            <label htmlFor='imageInput' className={cn('label-input-div', `${selectedImageFile && 'width-quater'}`)}>
              <Carmera />
            </label>
          )}
          <input type='file' className={cn('input-image-input')} id='imageInput' onChange={handleChangeImage} />
          {selectedImageFile &&
            selectedImageFile.map((imageUrl, index) => (
              <div key={imageUrl} className={cn('image-div')}>
                <Image alt='선택된 이미지' src={imageUrl} fill id={cn('image')} />
                <DeleteImage className={cn('delete-image-icon')} onClick={() => handleClickDeleteImage(index)} />
                {index === 0 && <div className={cn('main-image')}>대표</div>}
              </div>
            ))}
        </form>
      </div>
    </div>
  );
}
