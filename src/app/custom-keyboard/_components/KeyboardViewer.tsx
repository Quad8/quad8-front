'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { Suspense, useContext, useState } from 'react';
import classNames from 'classnames/bind';
import { KeyColorContext, StepContext } from '@/context/customKeyboardContext';
import { Vector3 } from 'three';
import styles from './KeyboardViewer.module.scss';
import Keyboard from './Keyboard';
import Step from './Step';
import CanvasLoading from './CanvasLoading';

const cn = classNames.bind(styles);

const CAMERA = {
  fov: 45,
  position: new Vector3(0, 1.4, 0),
};

const GL = {
  preserveDrawingBuffer: true,
  antialias: true,
};

export default function KeyboardViewer() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { updateFocusKey } = useContext(KeyColorContext);
  const { canvasRef, controlRef } = useContext(StepContext);

  const handleClickCanvas = () => {
    updateFocusKey(null);
  };

  return (
    <div className={cn('wrapper')}>
      <Suspense fallback={<CanvasLoading />}>
        <div className={cn('step-wrapper')}>{isLoaded && <Step />}</div>
        <Canvas
          camera={CAMERA}
          className={cn('canvas')}
          gl={GL}
          onPointerMissed={handleClickCanvas}
          ref={canvasRef}
          onCreated={() => setIsLoaded(true)}
        >
          <Keyboard />
          <Environment preset='city' />
          <OrbitControls ref={controlRef} />
        </Canvas>
      </Suspense>
    </div>
  );
}
