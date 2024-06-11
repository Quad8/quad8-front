'use client';

import { useContext } from 'react';
import { StepContext } from '@/context/customKeyboardContext';
import BoardOption from './BoardOption';
import SwitchOption from './SwitchOption';
import KeyCapOption from './KeyCapOption';

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
