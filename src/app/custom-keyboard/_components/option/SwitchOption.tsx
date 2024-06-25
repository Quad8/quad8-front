'use client';

import classNames from 'classnames/bind';
import { useContext, useState } from 'react';

import { Button, Modal } from '@/components';
import { KeyboardDataContext } from '@/context';
import { CrossCircleIcon } from '@/public/index';
import type { CustomKeyboardSwitchTypes } from '@/types/CustomKeyboardTypes';
import SwitchHelpModal from './SwitchHelpModal';

import styles from './SwitchOption.module.scss';

const cn = classNames.bind(styles);

const BUTTONS: CustomKeyboardSwitchTypes[] = ['청축', '적축', '갈축', '흑축'];

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
            <Button
              key={element}
              backgroundColor={switchType === element ? 'background-primary' : 'outline-gray-40'}
              width={199}
              radius={4}
              className={cn('button')}
              onClick={() => handleClickSwitchButton(element)}
              hoverColor='background-primary-60'
            >
              <div className={cn('switch-text', { selected: switchType === element })}>{element}</div>
            </Button>
          ))}
        </div>
      </div>
      <div className={cn('help')}>
        <div className={cn('help-title')}>
          <div>스위치 선택이 어려우신가요?</div>
          <CrossCircleIcon width={17} height={17} fill='#A5A5A5' onClick={() => setIsOpenModal(true)} />
        </div>
        <div className={cn('help-content')}>종류에 따라 타건감이나 소리가 다를 수 있습니다.</div>
      </div>
      <Modal isOpen={isOpenModal} onClose={onCloseModal}>
        <SwitchHelpModal />
      </Modal>
    </div>
  );
}
