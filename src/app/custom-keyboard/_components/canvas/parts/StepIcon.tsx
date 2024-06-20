'use client';

import classNames from 'classnames/bind';

import { StepCompleteIcon } from '@/public/index';
import type { CustomKeyboardStepStatusTypes } from '@/types/CustomKeyboardTypes';

import styles from './StepIcon.module.scss';

const cn = classNames.bind(styles);

interface StepIconProps {
  status: CustomKeyboardStepStatusTypes;
  number: number;
}

export default function StepIcon({ status, number }: StepIconProps) {
  if (status === 'pending') {
    return <div className={cn('pending-wrapper')}>{number}</div>;
  }
  if (status === 'current') {
    return (
      <div className={cn('current-outside')}>
        <div className={cn('current-inside')} />
      </div>
    );
  }
  return (
    <div className={cn('completed-wrapper')}>
      <StepCompleteIcon width={24} height={24} />
    </div>
  );
}
