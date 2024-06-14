'use client';

import classNames from 'classnames/bind';
import { useContext } from 'react';

import type { CustomKeyboardStepStatusTypes, CustomKeyboardStepTypes } from '@/types/CustomKeyboardTypes';
import { KeyColorContext, KeyboardDataContext, StepContext } from '@/context/customKeyboardContext';
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
  const { updateFocusKey } = useContext(KeyColorContext);
  const STEP_ICON: StepIconDataType[] = [
    { ID: 'board', STATUS: stepStatus.board, NAME: '배열, 외관' },
    { ID: 'switch', STATUS: stepStatus.switch, NAME: '스위치' },
    { ID: 'keyCap', STATUS: stepStatus.keyCap, NAME: '키캡' },
  ];

  /* 연결된 선은 해당 단계들(이전과 이후)이 모두 pending이 아니면 파란색(활성화) 상태 둘 중 하나라도 pending일 경우 비활성화(회색) 상태 */
  const FIRST_LINE_COMPLETED = stepStatus.board !== 'pending' && stepStatus.switch !== 'pending';
  const SECOND_LINE_COMPLETED = stepStatus.switch !== 'pending' && stepStatus.keyCap !== 'pending';

  const handleClickStep = (value: CustomKeyboardStepTypes) => {
    /* 
      모든 단계는 처음부터 순차적으로 이동 -> 현재 keyCap단계에 있는 경우 switchType은 무조건 선택되어 있어 자유롭게 이동 가능 상태.
      => switchType단계에서 선택되어있지 않은 경우, keyCap으로의 이동만 막으면 됨
    */
    if (currentStep === value) {
      /* 현재 step을 누른 경우 */
      return;
    }

    if (value === 'keyCap' && !switchType) {
      /* keycap으로 이동할 때, switchType이 비어있는 경우 */
      return;
    }
    /* Step 이동 시에, 현재 단계를 pending(swtichType의 경우 체크 안하고 이동할 때) 또는 completed처리, 이동하려는 Step은 current 처리 */
    updateStepStatus({
      [currentStep]: currentStep === 'switch' && !switchType ? 'pending' : 'completed',
      [value]: 'current',
    });
    updateFocusKey(null);
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
