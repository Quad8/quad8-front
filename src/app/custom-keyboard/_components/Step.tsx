'use client';

import classNames from 'classnames/bind';
import { StepContext } from '@/context/customKeyboardContext';
import { useContext } from 'react';
import styles from './Step.module.scss';
import StepIcon from './StepIcon';

const cn = classNames.bind(styles);

interface StepIconDataType {
  STATUS: 'pending' | 'current' | 'completed';
  NAME: string;
}

export default function Step() {
  const { stepStatus } = useContext(StepContext);
  const STEP_ICON: StepIconDataType[] = [
    { STATUS: stepStatus.board, NAME: '배열, 외관' },
    { STATUS: stepStatus.switch, NAME: '스위치' },
    { STATUS: stepStatus.keyCap, NAME: '키캡' },
  ];

  return (
    <div className={cn('wrapper')}>
      {STEP_ICON.map((icon, i) => (
        <div key={icon.NAME} className={cn('content-wrapper')}>
          <StepIcon status={icon.STATUS} number={i + 1} />
          <div>{icon.NAME}</div>
        </div>
      ))}

      <div className={cn('line', 'first-line')} />
      <div className={cn('line', 'second-line')} />
    </div>
  );
}
