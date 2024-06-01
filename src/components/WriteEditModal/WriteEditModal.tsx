import KEYBOARD_DATA from '@/app/mj/customData';
import { WRITE_EIDT_MODAL_TYPE, WriteEditModalType } from '@/constants/writeEditModalType';
import classNames from 'classnames/bind';
import TwoButton from '../buttons/TwoButton/TwoButton';
import ImageInput from './ImageInput';
import KeyboardInfoBox from './KeyboardInfoBox';
import styles from './WriteEditModal.module.scss';

interface WriteEditModalProps {
  type: WriteEditModalType;
}

const cn = classNames.bind(styles);
export default function WriteEditModal({ type }: WriteEditModalProps) {
  const handleClickLeftButton = () => {
    /** 닫기버튼 누르면 실행되는 함수 */
  };
  const handleClickRightButton = () => {
    /** 등록 버튼 누르면 실행되는 함수 */
  };
  return (
    <div className={cn('container')}>
      <KeyboardInfoBox keyboardInfo={KEYBOARD_DATA} isReview={type !== WRITE_EIDT_MODAL_TYPE.writePost} />
      <div className={cn('input-div')}>
        <input className={cn('input')} placeholder='제목 작성' />
        <ImageInput />
        <input className={cn('input')} placeholder='내용 작성' />
        <TwoButton
          leftText="닫기"
          leftOnClick={handleClickLeftButton}
          rightText="등록"
          rightOnClick={handleClickRightButton}
        />
      </div>
    </div>
  );
}
