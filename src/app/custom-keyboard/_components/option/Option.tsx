'use client';

import { useContext } from 'react';

import { StepContext } from '@/context';
import BoardOption from './BoardOption';
import KeyCapOption from './KeyCapOption';
import SwitchOption from './SwitchOption';

export default function Option() {
  const { currentStep } = useContext(StepContext);

  if (currentStep === 'board') {
    return <BoardOption />;
  }

  if (currentStep === 'switch') {
    return <SwitchOption />;
  }
  return <KeyCapOption />;
}
