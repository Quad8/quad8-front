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
      <Suspense fallback={null}>
        <Canvas
          shadows
          flat
          camera={{
            fov: 45,
            position: [0, 0.3, 3],
          }}
          style={{ background: '#f0f0f0' }}
          gl={{ preserveDrawingBuffer: true, antialias: true }}
        >
          <Keyboard />
          <Environment preset="warehouse" blur={1} />
          <OrbitControls />
        </Canvas>
      </Suspense>
    </div>
  );
}
