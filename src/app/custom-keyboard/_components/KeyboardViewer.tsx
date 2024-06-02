'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { Suspense, useContext } from 'react';
import classNames from 'classnames/bind';
import { KeyColorContext } from '@/context/customKeyboardContext';
import styles from './KeyboardViewer.module.scss';
import Keyboard from './Keyboard';

const cn = classNames.bind(styles);

export default function KeyboardViewer() {
  const { updateFocusKey } = useContext(KeyColorContext);

  const handleClickCanvs = () => {
    updateFocusKey(null);
  };

  return (
    <div className={cn('wrapper')}>
      <div className={cn('option-wrapper')}>option</div>
      <Suspense fallback={null}>
        <Canvas
          shadows
          camera={{
            fov: 45,
            position: [0, 1.5, 0],
          }}
          className={cn('canvas')}
          gl={{ preserveDrawingBuffer: true, antialias: true }}
          onPointerMissed={handleClickCanvs}
        >
          <Keyboard />
          <Environment preset='city' background />
          <OrbitControls />
        </Canvas>
      </Suspense>
    </div>
  );
}
