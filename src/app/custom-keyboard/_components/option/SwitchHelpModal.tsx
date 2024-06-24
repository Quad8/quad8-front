'use client';

import classNames from 'classnames/bind';
import { useRef, useState } from 'react';

import type { CustomKeyboardSwitchTypes } from '@/types/CustomKeyboardTypes';
import { Button } from '@/components';
import { SoundVibrationIcon } from '@/public/index';

import styles from './SwitchHelpModal.module.scss';

const cn = classNames.bind(styles);

const BUTTON_LIST: CustomKeyboardSwitchTypes[] = ['청축', '적축', '갈축', '흑축'];
const SWITCH_SOUND: Record<CustomKeyboardSwitchTypes, string> = {
  청축: 'blueSwitch',
  적축: 'redSwitch',
  갈축: 'brownSwitch',
  흑축: 'blackSwitch',
};

export default function SwitchHelpModal() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [clickButtonType, setClickButtonType] = useState<CustomKeyboardSwitchTypes | null>(null);

  const handleClickButton = (value: CustomKeyboardSwitchTypes) => {
    if (!audioRef.current) {
      return;
    }
    if (timerRef.current) {
      audioRef.current.pause();
      clearTimeout(timerRef.current);
    }

    setClickButtonType(value);
    Object.assign(audioRef.current, { src: `/audios/${SWITCH_SOUND[value]}.mp3`, currentTime: 0, volume: 0.2 });
    audioRef.current.play();
    timerRef.current = setTimeout(() => {
      audioRef.current?.pause();
      setClickButtonType(null);
      timerRef.current = null;
    }, 5500);
  };

  return (
    <div className={cn('wrapper')}>
      <audio ref={audioRef} preload='auto' aria-describedby='no-caption' />
      <div className={cn('title-wrapper')}>
        <div className={cn('title')}>스위치 선택이 어려우신가요?</div>
        <div className={cn('sub-title')}>버튼을 클릭하면 해당 스위치 타건 소리가 들립니다.</div>
      </div>
      <div className={cn('button-wrapper')}>
        {BUTTON_LIST.map((button) => (
          <Button
            className={cn('button')}
            radius={4}
            backgroundColor={clickButtonType === button ? 'outline-primary' : 'outline-gray-40'}
            key={button}
            onClick={() => handleClickButton(button)}
            hoverColor='outline-primary-60'
          >
            <div className={cn('button-content', clickButtonType === button && 'checked-text')}>
              <p>{button}</p>
              <SoundVibrationIcon
                width={22}
                height={20}
                className={cn('sound-icon', { 'checked-icon': clickButtonType === button })}
              />
            </div>
          </Button>
        ))}
      </div>
      <div className={cn('footer-wrapper')}>
        <p>청축 : 클릭 소리가 나며, 클릭감을 제공</p>
        <p>적축 : 걸림이 없는 부드러운 스위치</p>
        <p>갈축 : 클릭 소리없이 클릭감을 제공</p>
        <p>흑축 : 적축보다 압력감이 강한 스위치</p>
      </div>
    </div>
  );
}
