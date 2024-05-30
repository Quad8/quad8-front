'use client';

import { useContext } from 'react';
import { StepContext } from '@/context/customKeyboardContext';
import BoardOption from './BoardOption';

export default function Option() {
  const { currentStep } = useContext(StepContext);

  if (currentStep === 'board') {
    return <BoardOption />;
  }

  if (currentStep === 'switch') {
    return <div>switch</div>;
  }
  return <div>keyCap</div>;
}
