import classNames from 'classnames/bind';
import { ChangeEvent, useState } from 'react';
import Image from 'next/image';

import { PostCardDetailModalCustomKeyboardType } from '@/types/CommunityTypes';
import { Button, ImageInput, InputField, TextField } from '@/components';
import { keydeukImg } from '@/public/index';

import styles from './WriteEditModal.module.scss';

const cn = classNames.bind(styles);

interface WriteEditModalProps {
  keyboardInfo: PostCardDetailModalCustomKeyboardType;
  isCustomReview?: boolean;
}

const TITLE_MAX_LENGTH = 20;
const TITLE_PLACEHOLDER = '미 입력 시 키득 커스텀 키보드로 등록됩니다.';
const CONTENT_PLACEHOLDER = '최소 20자 이상 입력해주세요';

export default function WriteEditModal({ keyboardInfo, isCustomReview }: WriteEditModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    console.log(content);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    /** 등록 버튼 누르면 실행되는 함수 */
    setTitle(title || '키드 커스텀 키보드');
  };

  return (
    <form className={cn('container')} onSubmit={handleSubmit}>
      <div>
        {isCustomReview && <p className={cn('info-text')}>해당 후기는 커뮤니티란에 게시됩니다.</p>}
        <div className={cn('keyboard-info-wrapper')}>
          <div className={cn('keyboard-image')}>
            <Image src={keydeukImg} alt='커스텀 키보드 이미지' width={143} height={143} />
          </div>
          <div className={cn('keyboard-info')}>
            <p className={cn('keyboard-info-title')}>키득 커스텀 키보드</p>
            <div>{keyboardInfo.baseKeyColor + keyboardInfo.baseKeyColor}</div>
          </div>
        </div>
      </div>
      <div className={cn('input-wrapper')}>
        <div className={cn('title-input-wrapper')}>
          <InputField
            label='제목'
            sizeVariant='md'
            className={cn('title-input')}
            placeholder={TITLE_PLACEHOLDER}
            maxLength={TITLE_MAX_LENGTH}
            onChange={handleTitleChange}
            labelSize='lg'
          />
          <div className={cn('character-limit')}>
            {title.length} / {TITLE_MAX_LENGTH}
          </div>
        </div>
        <ImageInput />
        <TextField
          label='내용'
          className={cn('text-area-input')}
          placeholder={CONTENT_PLACEHOLDER}
          onChange={handleContentChange}
          sizeVariant='md'
        />
      </div>
      <div className={cn('button-wrapper')}>
        <Button onClick={handleSubmit}>등록</Button>
      </div>
    </form>
  );
}
