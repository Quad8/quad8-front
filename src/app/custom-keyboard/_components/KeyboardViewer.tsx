'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import classNames from 'classnames/bind';
import styles from './KeyboardViewer.module.scss';
import Keyboard from './Keyboard';

const cn = classNames.bind(styles);

export default function KeyboardViewer() {
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
        >
          <Keyboard />
          <Environment preset='city' blur={1} />
          <OrbitControls />
        </Canvas>
      </Suspense>
    </div>
  );
}
