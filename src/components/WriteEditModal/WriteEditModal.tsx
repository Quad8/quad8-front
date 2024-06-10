import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import KEYBOARD_DATA from '@/app/mj/customData';
import { InputField, ImageInput, KeyboardInfoBox, Button, TextField } from '@/components';
import styles from './WriteEditModal.module.scss';

const cn = classNames.bind(styles);

interface WriteEditModalProps {
  isCustomReview?: boolean;
}

const TITLE_MAX_LENGTH = 20;
const TITLE_PLACEHOLDER = '미 입력 시 키득 커스텀 키보드로 등록됩니다.';
const CONTENT_PLACEHOLDER = '최소 20자 이상 입력해주세요';

export default function WriteEditModal({ isCustomReview }: WriteEditModalProps) {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('');
  const [titleLength, setTitleLength] = useState(0);

  const contentInputRef = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState('');

  const handleTitleInputChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const newTitle = target.value.slice(0, TITLE_MAX_LENGTH);
    setTitleLength(newTitle.length);
    setTitle(newTitle);
  };

  useEffect(() => {
    document.addEventListener('input', handleTitleInputChange);

    return () => {
      document.removeEventListener('input', handleTitleInputChange);
    };
  }, []);

  const handleSubmit = () => {
    /** 등록 버튼 누르면 실행되는 함수 */
    const titleValue = titleInputRef.current?.value;
    if (titleValue) {
      setTitle(titleValue);
    } else {
      setTitle('키득 커스텀 키보드');
    }

    const contentValue = contentInputRef.current?.value;
    if (contentValue) {
      setContent(contentValue);
    }
  };

  return (
    <form className={cn('container')} onSubmit={handleSubmit}>
      <KeyboardInfoBox keyboardInfo={KEYBOARD_DATA} isCustomReview={isCustomReview} />
      <div className={cn('input-wrapper')}>
        <div className={cn('title-input-wrapper')}>
          <InputField
            label='제목'
            sizeVariant='md'
            className={cn('title-input')}
            placeholder={TITLE_PLACEHOLDER}
            ref={titleInputRef}
            maxLength={TITLE_MAX_LENGTH}
          />
          <div className={cn('character-limit')}>
            {titleLength} / {TITLE_MAX_LENGTH}
          </div>
        </div>
        <ImageInput />
        <TextField
          label='내용'
          className={cn('text-area-input')}
          placeholder={CONTENT_PLACEHOLDER}
          ref={contentInputRef}
        />
        <div className={cn('button-wrapper')}>
          <Button onClick={handleSubmit}>후기 등록하기</Button>
        </div>
        <p>
          {title} {content}
        </p>
      </div>
    </form>
  );
}
