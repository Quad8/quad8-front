'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { Suspense, useContext } from 'react';
import classNames from 'classnames/bind';
import { KeyColorContext } from '@/context/customKeyboardContext';
import styles from './KeyboardViewer.module.scss';
import Keyboard from './Keyboard';
import Step from './Step';

const cn = classNames.bind(styles);

export default function KeyboardViewer() {
  const { updateFocusKey } = useContext(KeyColorContext);

  const handleClickCanvs = () => {
    updateFocusKey(null);
  };

  return (
    <div className={cn('wrapper')}>
      <div className={cn('option-wrapper')}>
        <Step />
      </div>
      <Suspense fallback={<div>Loading</div>}>
        <Canvas
          shadows
          camera={{
            fov: 45,
            position: [0, 1.5, 0],
          }}
          className={cn('canvas')}
          gl={{ preserveDrawingBuffer: true, antialias: true }}
          onPointerMissed={handleClickCanvs}
          style={{ zIndex: 0 }}
        >
          <Keyboard />
          <Environment preset='city' />
          <OrbitControls />
        </Canvas>
      </Suspense>
    </div>
  );
}
