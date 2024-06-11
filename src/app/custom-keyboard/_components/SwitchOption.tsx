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

const BUTTONS = ['청축', '적축', '갈축', '흑축'];

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
              key={element}
              type='button'
              className={cn('button', { selected: switchType === element })}
              onClick={() => handleClickSwitchButton(element as CustomKeyboardSwitchTypes)}
            >
              {element}
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
