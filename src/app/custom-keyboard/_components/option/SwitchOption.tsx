'use client';

import classNames from 'classnames/bind';
import { useContext, useState } from 'react';

import type { CustomKeyboardSwitchTypes } from '@/types/CustomKeyboardTypes';
import Modal from '@/components/Modal/Modal';
import CrossCircleIcon from '@/public/svgs/crossCircle.svg';
import { blueSwitchImg, redSwitchImg, brownSwitchImg, blackSwitchImg } from '@/public/index';
import { Button } from '@/components';
import Image, { StaticImageData } from 'next/image';
import { KeyboardDataContext } from '@/context';
import SwitchHelpModal from './SwitchHelpModal';

import styles from './SwitchOption.module.scss';

const cn = classNames.bind(styles);

interface ButtonType {
  name: CustomKeyboardSwitchTypes;
  imageSrc: StaticImageData;
}

const BUTTONS: ButtonType[] = [
  { name: '청축', imageSrc: blueSwitchImg },
  { name: '적축', imageSrc: redSwitchImg },
  { name: '갈축', imageSrc: brownSwitchImg },
  { name: '흑축', imageSrc: blackSwitchImg },
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
            <Button
              key={element.name}
              backgroundColor={switchType === element.name ? 'outline-primary' : 'outline-gray-40'}
              radius={4}
              hoverColor='outline-primary-60'
              className={cn('button')}
              onClick={() => handleClickSwitchButton(element.name)}
            >
              <div className={cn('image-wrapper')}>
                <Image
                  src={element.imageSrc}
                  alt={element.name}
                  width={199}
                  height={116}
                  className={cn('switch-image')}
                />
              </div>

              <div className={cn('switch-text', { selected: switchType === element.name })}>{element.name}</div>
            </Button>
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
        <SwitchHelpModal />
      </Modal>
    </div>
  );
}
