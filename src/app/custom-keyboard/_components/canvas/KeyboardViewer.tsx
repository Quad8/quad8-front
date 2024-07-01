'use client';

import classNames from 'classnames/bind';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { Suspense, useContext, useState } from 'react';
import { Vector3 } from 'three';

import { FocusKeyContext, StepContext } from '@/context';
import LogoLoading from '@/components/LogoLoading/LogoLoading';
import Keyboard from './parts/Keyboard';
import Step from './Step';

import styles from './KeyboardViewer.module.scss';

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
  const { updateFocusKey } = useContext(FocusKeyContext);
  const { canvasRef, controlRef } = useContext(StepContext);

  const handleClickCanvas = () => {
    updateFocusKey(null);
  };

  return (
    <div className={cn('wrapper')}>
      <Suspense fallback={<LogoLoading />}>
        {isLoaded && <Step />}
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
