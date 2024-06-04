import KEYBOARD_DATA from '@/app/mj/customData';
import { WRITE_EIDT_MODAL_TYPE, WriteEditModalType } from '@/constants/writeEditModalType';
import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import ImageInput from './ImageInput';
import KeyboardInfoBox from './KeyboardInfoBox';
import styles from './WriteEditModal.module.scss';
import Button from '../Button/Button';
import InputField from '../InputField/InputField';
import TextField from '../TextField/TextField';

interface WriteEditModalProps {
  type: WriteEditModalType;
}

const cn = classNames.bind(styles);

export default function WriteEditModal({ type }: WriteEditModalProps) {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const titileInputPlaceHolder = '미 입력 시 키득 커스텀 키보드로 등록됩니다.';
  const [title, setTitle] = useState('');

  const contentInputRef = useRef<HTMLTextAreaElement>(null);
  const contentInputPlaceHolder = '최소 20자 이상 입력해주세요';
  const [content, setContent] = useState('');

  const handleClickLeftButton = () => {
    /** 닫기버튼 누르면 실행되는 함수 */
    console.log(title);
    console.log(content);
  };
  const handleClickRightButton = () => {
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
    <div className={cn('container')}>
      <KeyboardInfoBox keyboardInfo={KEYBOARD_DATA} isReview={type !== WRITE_EIDT_MODAL_TYPE.writePost} />
      <div className={cn('input-wrapper')}>
        <InputField
          label='제목'
          size='lg'
          className={cn('title-input')}
          placeholder={titileInputPlaceHolder}
          ref={titleInputRef}
        />
        <ImageInput />
        <TextField
          label='내용'
          className={cn('text-area-input')}
          placeholder={contentInputPlaceHolder}
          ref={contentInputRef}
        />
        <div className={cn('button-wrapper')}>
          <Button onClick={handleClickLeftButton}>닫기</Button>
          <Button onClick={handleClickRightButton}>등록 </Button>
        </div>
      </div>
    </div>
  );
}
