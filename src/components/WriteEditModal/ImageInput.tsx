'use client';

import { useState, ChangeEvent, MouseEvent } from 'react';
import Image from 'next/image';
import CarmeraIcon from '@/public/svgs/camera.svg';
import classNames from 'classnames/bind';
import DeleteImageIcon from '@/public/svgs/delete.svg';
import styles from './ImageInput.module.scss';

const cn = classNames.bind(styles);

export default function ImageInput() {
  const [selectedImageFile, setSelectedImageFile] = useState<string[]>([]);
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (selectedImageFile.length >= 4 || !files) {
      // alert('이미지 4개 이상 불가');
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
      <div className={cn('title-div')}>
        <h1 id={cn('title')}>사진/동영상 첨부하기</h1>
        <h3 id={cn('sub-title')}>최대 4장</h3>
      </div>
      <div>
        <form className={cn('input-div')}>
          {selectedImageFile &&
            selectedImageFile.map((imageUrl, index) => (
              <div key={imageUrl} className={cn('image-div')}>
                <Image alt='선택된 이미지' src={imageUrl} fill id={cn('image')} />
                <div className={cn('delete-image-icon')} onClick={(e) => handleClickDeleteImage(e, index)}>
                  <DeleteImageIcon fill='#ffffff' width={42} height={42} />
                </div>
                {index === 0 && <div className={cn('main-image-tag')}>대표</div>}
              </div>
            ))}
          {selectedImageFile.length < 4 && (
            <label htmlFor='imageInput' className={cn('label-input')}>
              <CarmeraIcon />
            </label>
          )}
          <input type='file' className={cn('input-image-input')} id='imageInput' onChange={handleChangeImage} />
        </form>
      </div>
    </div>
  );
}
