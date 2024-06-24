'use client';

import { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import { UseFormRegister, FieldValues, UseFormSetValue } from 'react-hook-form';

import { CameraIcon, DeleteIcon } from '@/public/index';
import { IMAGE_BLUR } from '@/constants/blurImage';
import styles from './ImageInput.module.scss';

const cn = classNames.bind(styles);

interface CustomImagesType {
  id: number;
  imgUrl: string;
}

interface ImageInputProps {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  editCustomImages?: CustomImagesType[];
  onSaveDeletedImageId?: (id: number) => void;
}

export default function ImageInput({ register, setValue, editCustomImages, onSaveDeletedImageId }: ImageInputProps) {
  const [selectedImageUrls, setSelectedImageUrls] = useState<string[]>([]);
  const [selectedImageFiles, setSelectedImageFiles] = useState<File[]>([]);

  useEffect(() => {
    if (editCustomImages) {
      const initialUrls = editCustomImages.map((image) => image.imgUrl);
      setSelectedImageUrls(initialUrls);
    }
  }, [editCustomImages]);

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

    const clickedImageUrl = selectedImageUrls[clickedImageIndex];

    if (editCustomImages && onSaveDeletedImageId) {
      const imageToDelete = editCustomImages.find((image) => image.imgUrl === clickedImageUrl);
      if (imageToDelete) {
        onSaveDeletedImageId(imageToDelete.id);
      }
    }

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
          {selectedImageUrls?.map((imageUrl, index) => (
            <div key={imageUrl} className={cn('image-wrapper')}>
              <Image
                alt='선택된 이미지'
                src={imageUrl}
                fill
                className={cn('image')}
                priority
                placeholder={IMAGE_BLUR.placeholder}
                blurDataURL={IMAGE_BLUR.blurDataURL}
              />
              <div className={cn('delete-image-icon')} onClick={(e) => handleClickDeleteImage(e, index)}>
                <DeleteIcon fill='#ffffff' width={32} height={32} />
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
