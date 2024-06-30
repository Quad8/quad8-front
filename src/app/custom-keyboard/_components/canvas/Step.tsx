'use client';

import classNames from 'classnames/bind';
import { useContext } from 'react';

import type { CustomKeyboardStepStatusTypes, CustomKeyboardStepTypes } from '@/types/CustomKeyboardTypes';
import { useCaptureCanvas } from '@/hooks/useCanvasCaptrue';
import { FocusKeyContext, KeyboardDataContext, StepContext } from '@/context';
import StepIcon from './parts/StepIcon';

import styles from './Step.module.scss';

const cn = classNames.bind(styles);

interface StepIconDataType {
  ID: CustomKeyboardStepTypes;
  STATUS: CustomKeyboardStepStatusTypes;
  NAME: string;
}

export default function Step() {
  const { stepStatus, currentStep, updateCurrentStep, updateStepStatus } = useContext(StepContext);
  const {
    keyboardData: { switchType },
  } = useContext(KeyboardDataContext);
  const { updateFocusKey } = useContext(FocusKeyContext);
  const { captureCanvas } = useCaptureCanvas();
  const STEP_ICON: StepIconDataType[] = [
    { ID: 'board', STATUS: stepStatus.board, NAME: '배열, 외관' },
    { ID: 'switch', STATUS: stepStatus.switch, NAME: '스위치' },
    { ID: 'keyCap', STATUS: stepStatus.keyCap, NAME: '키캡' },
  ];

  /* 연결된 선은 해당 단계들(이전과 이후)이 모두 pending이 아니면 파란색(활성화) 상태 둘 중 하나라도 pending일 경우 비활성화(회색) 상태 */
  const FIRST_LINE_COMPLETED = stepStatus.board !== 'pending' && stepStatus.switch !== 'pending';
  const SECOND_LINE_COMPLETED = stepStatus.switch !== 'pending' && stepStatus.keyCap !== 'pending';

  const handleClickStep = (value: CustomKeyboardStepTypes) => {
    if (currentStep === value || (value === 'keyCap' && !switchType)) {
      return;
    }

    if (currentStep === 'board') {
      captureCanvas(() => {
        updateStepStatus({
          board: 'completed',
          [value]: 'current',
        });
        updateCurrentStep(value);
      });
      return;
    }
    updateFocusKey(null);
    updateStepStatus({ [currentStep]: 'completed', [value]: 'current' });
    updateCurrentStep(value);
  };

  return (
    <div className={cn('wrapper')}>
      {STEP_ICON.map((icon, i) => (
        <div key={icon.ID} className={cn('content-wrapper')}>
          <button type='button' onClick={() => handleClickStep(icon.ID)} className={cn('step-button')}>
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
