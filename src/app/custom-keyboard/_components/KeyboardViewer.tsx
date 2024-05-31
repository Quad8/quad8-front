'use client';

import classNames from 'classnames/bind';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Environment, OrbitControls } from '@react-three/drei';
import styles from './KeyboardViewer.module.scss';
import Keyboard from './Keyboard';

const cn = classNames.bind(styles);

export default function KeyboardViewer() {
  return (
    <div className={cn('wrapper')}>
      <Suspense fallback={null}>
        <Canvas
          shadows
          camera={{
            fov: 45,
            position: [0, 1, 0],
          }}
          style={{ background: '#fafafa' }}
          gl={{ preserveDrawingBuffer: true, antialias: true }}
        >
          <Keyboard />
          <Environment preset="city" blur={1} />
          <OrbitControls />
        </Canvas>
      </Suspense>
    </div>
  );
}
