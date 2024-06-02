'use client';

import { KEY, TEN_KEY } from '@/constants/keyboardData';
import { KeyColorContext, KeyboardDataContext, StepContext } from '@/context/customKeyboardContext';
import { useGLTF } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { useContext } from 'react';
import { Mesh, MeshStandardMaterial } from 'three';
import { GLTF } from 'three-stdlib';

interface KeyboardNodes {
  nodes: { [key: string]: Mesh };
  materials: { [key: string]: MeshStandardMaterial };
}

export default function Keyboard() {
  const {
    keyboardData: { type, texture, boardColor },
  } = useContext(KeyboardDataContext);

  const { keyColorData, focusKey, updateFocusKey } = useContext(KeyColorContext);
  const { currentStep } = useContext(StepContext);
  const { nodes, materials } = useGLTF(
    type === 'tkl' ? '/glbs/tklKeyboard.glb' : '/glbs/keyboard.glb',
  ) as unknown as GLTF & KeyboardNodes;

  const SCALE = type === 'tkl' ? 3.2 : 0.05;
  const KEY_BUTTONS = type === 'tkl' ? [...KEY] : [...KEY, ...TEN_KEY];
  const MATELNESS = texture === 'metal' ? 0.9 : 0;
  const ROUGHNESS = texture === 'metal' ? 0 : 0.7;

  const handleClickKey = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const key = e.object.name;
    if (!key || key === focusKey) {
      updateFocusKey(null);
      return;
    }
    updateFocusKey(key);
  };

  return (
    <group onClick={() => currentStep === 'keyCap' && handleClickKey}>
      <mesh
        geometry={nodes.Cube.geometry}
        material={materials.Cube}
        material-color={boardColor}
        position={[0.1, 0, 0]}
        rotation={type === 'tkl' ? [-1.55, 0, 0] : [0, 0, 0]}
        scale={SCALE}
        material-metalness={MATELNESS}
        material-roughness={ROUGHNESS}
      />
      {KEY_BUTTONS.map((key) => (
        <mesh
          key={key}
          name={key}
          geometry={nodes[key].geometry}
          position={[0.1, 0, 0]}
          rotation={type === 'tkl' ? [-1.55, 0, 0] : [0, 0, 0]}
          scale={SCALE}
        >
          <meshStandardMaterial
            name={key}
            color={keyColorData[key]}
            opacity={focusKey && focusKey !== key ? 0.7 : 1}
            transparent
          />
        </mesh>
      ))}
    </group>
  );
}
