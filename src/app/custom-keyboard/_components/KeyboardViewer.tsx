'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { Suspense, useContext } from 'react';
import classNames from 'classnames/bind';
import { KeyColorContext } from '@/context/customKeyboardContext';
import { Vector3 } from 'three';
import styles from './KeyboardViewer.module.scss';
import Keyboard from './Keyboard';
import Step from './Step';

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
  const { updateFocusKey } = useContext(KeyColorContext);

  const handleClickCanvas = () => {
    updateFocusKey(null);
  };

  return (
    <div className={cn('wrapper')}>
      <div className={cn('step-wrapper')}>
        <Step />
      </div>
      <Suspense fallback={<div>Loading</div>}>
        <Canvas camera={CAMERA} className={cn('canvas')} gl={GL} onPointerMissed={handleClickCanvas}>
          <Keyboard />
          <Environment preset='city' />
          <OrbitControls />
        </Canvas>
      </Suspense>
    </div>
  );
}
