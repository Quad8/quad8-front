import { StepContext, FocusKeyContext } from '@/context';
import { useContext } from 'react';

export const useCaptureCanvas = () => {
  const { currentStep, canvasRef, controlRef, updateKeyboardImage } = useContext(StepContext);
  const { updateFocusKey } = useContext(FocusKeyContext);

  const captureCanvas = (onCaptureEnd?: () => void) => {
    const canvas = canvasRef?.current;
    const control = controlRef?.current;
    if (!canvas || !control || currentStep === 'switch') {
      return;
    }
    updateFocusKey(null);
    setTimeout(() => {
      control.reset();
      requestAnimationFrame(() => {
        const image = canvas.toDataURL('image/png');
        updateKeyboardImage(currentStep, image);
        if (onCaptureEnd) {
          onCaptureEnd();
        }
      });
    }, 1);
  };

  return { captureCanvas };
};
