'use client';

import classNames from 'classnames/bind';
import { KeyboardDataContext, StepContext } from '@/context/customKeyboardContext';
import { useContext } from 'react';
import styles from './Step.module.scss';
import StepIcon from './StepIcon';

const cn = classNames.bind(styles);

interface StepIconDataType {
  ID: 'board' | 'switch' | 'keyCap';
  STATUS: 'pending' | 'current' | 'completed';
  NAME: string;
}

export default function Step() {
  const { stepStatus, currentStep, updateCurrentStep, updateStepStatus } = useContext(StepContext);
  const {
    keyboardData: { switchType },
  } = useContext(KeyboardDataContext);
  const STEP_ICON: StepIconDataType[] = [
    { ID: 'board', STATUS: stepStatus.board, NAME: '배열, 외관' },
    { ID: 'switch', STATUS: stepStatus.switch, NAME: '스위치' },
    { ID: 'keyCap', STATUS: stepStatus.keyCap, NAME: '키캡' },
  ];

  const FIRST_LINE_COMPLETED = stepStatus.board !== 'pending' && stepStatus.switch !== 'pending';
  const SECOND_LINE_COMPLETED = stepStatus.switch !== 'pending' && stepStatus.keyCap !== 'pending';

  const handleClickStep = (value: 'board' | 'switch' | 'keyCap') => {
    if (currentStep === value) {
      return;
    }
    if (value === 'keyCap' && !switchType) {
      return;
    }

    updateStepStatus({
      [currentStep]: currentStep === 'switch' && !switchType ? 'pending' : 'completed',
      [value]: 'current',
    });

    updateCurrentStep(value);
  };

  return (
    <div className={cn('wrapper')}>
      {STEP_ICON.map((icon, i) => (
        <div key={icon.ID} className={cn('content-wrapper')}>
          <button type='button' onClick={() => handleClickStep(icon.ID)}>
            <StepIcon status={icon.STATUS} number={i + 1} />
          </button>
          <div className={cn('content-text')}>{icon.NAME}</div>
        </div>
      ))}

      <div className={cn('line', 'first-line', { 'completed-line': FIRST_LINE_COMPLETED })} />
      <div className={cn('line', 'second-line', { 'completed-line': SECOND_LINE_COMPLETED })} />
    </div>
  );
}
