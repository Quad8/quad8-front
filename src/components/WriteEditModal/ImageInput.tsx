'use client';

import { useState, ChangeEvent, MouseEvent } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import { UseFormRegister, FieldValues, UseFormSetValue } from 'react-hook-form';

import { CameraIcon, DeleteIcon } from '@/public/index';

import styles from './ImageInput.module.scss';

const cn = classNames.bind(styles);

interface ImageInputProps {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

export default function ImageInput({ register, setValue }: ImageInputProps) {
  const [selectedImageUrls, setSelectedImageUrls] = useState<string[]>([]);
  const [selectedImageFiles, setSelectedImageFiles] = useState<File[]>([]);

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files || selectedImageUrls.length >= 4) {
      return;
    }

    const imageFile = files[0];
    const imageUrl = URL.createObjectURL(imageFile);

    setSelectedImageFiles((prevFiles) => [...prevFiles, imageFile]);
    setSelectedImageUrls((prevUrls) => [...prevUrls, imageUrl]);

    setValue('files', [...selectedImageFiles, imageFile]);
  };

  const handleClickDeleteImage = (e: MouseEvent<HTMLDivElement>, clickedImageIndex: number) => {
    e.stopPropagation();
    setSelectedImageUrls((prev) => [...prev.slice(0, clickedImageIndex), ...prev.slice(clickedImageIndex + 1)]);
    setSelectedImageFiles((prev) => [...prev.slice(0, clickedImageIndex), ...prev.slice(clickedImageIndex + 1)]);
  };

  return (
    <div className={cn('container')}>
      <div className={cn('title-wrapper')}>
        <h1 className={cn('title')}>사진/동영상 첨부하기</h1>
        <h3 className={cn('sub-title')}>최대 4장</h3>
      </div>
      <div>
        <div className={cn('input-wrapper')}>
          {selectedImageUrls &&
            selectedImageUrls.map((imageUrl, index) => (
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
          {selectedImageUrls.length < 4 && (
            <label htmlFor='imageInput' className={cn('label-input')}>
              <CameraIcon fill='#999999' width={46} height={40} />
            </label>
          )}
          <input
            type='file'
            className={cn('input-image-input')}
            id='imageInput'
            {...register('files', {
              onChange: handleChangeImage,
              validate: () => selectedImageUrls.length > 0 && true,
            })}
          />
        </div>
      </div>
    </div>
  );
}
