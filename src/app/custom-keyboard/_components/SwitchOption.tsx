'use client';

import classNames from 'classnames/bind';
import { useContext, useState } from 'react';
import { KeyboardDataContext } from '@/context/customKeyboardContext';
import Modal from '@/components/Modal/Modal';
import type { CustomKeyboardSwitchTypes } from '@/types/CustomKeyboardTypes';
import CrossCircleIcon from '@/public/svgs/crossCircle.svg';
import styles from './SwitchOption.module.scss';
import SwitchHelp from './SwitchHelp';

const cn = classNames.bind(styles);

interface ButtonType {
  name: string;
  value: CustomKeyboardSwitchTypes;
}

const BUTTONS: ButtonType[] = [
  { name: '청축', value: '청축' },
  { name: '적축', value: '적축' },
  { name: '갈축', value: '갈축' },
  { name: '흑축', value: '흑축' },
];

export default function SwitchOption() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const {
    keyboardData: { switchType },
    updateData,
  } = useContext(KeyboardDataContext);
  const handleClickSwitchButton = (value: CustomKeyboardSwitchTypes) => {
    updateData('switchType', value);
  };

  const onCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div className={cn('wrapper')}>
      <div className={cn('content-wrapper')}>
        <div className={cn('title')}>스위치</div>
        <div className={cn('button-wrapper')}>
          {BUTTONS.map((element) => (
            <button
              key={element.name}
              type='button'
              className={cn('button', { selected: switchType === element.value })}
              onClick={() => handleClickSwitchButton(element.value)}
            >
              {element.name}
            </button>
          ))}
        </div>
      </div>
      <div className={cn('help')}>
        <div className={cn('help-title')}>
          <div>스위치 선택이 어려우신가요?</div>
          <CrossCircleIcon width={17} height={17} onClick={() => setIsOpenModal(true)} />
        </div>
        <div className={cn('help-content')}>종류에 따라 타건감이나 소리가 다를 수 있습니다.</div>
      </div>
      <Modal isOpen={isOpenModal} onClose={onCloseModal}>
        <SwitchHelp />
      </Modal>
    </div>
  );
}
