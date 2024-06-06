'use client';

import { KEY, TEN_KEY, POINT_KEY } from '@/constants/keyboardData';
import { KeyColorContext, KeyboardDataContext, StepContext } from '@/context/customKeyboardContext';
import { useGLTF } from '@react-three/drei';
import { ThreeEvent, Color } from '@react-three/fiber';
import { useContext } from 'react';
import { Euler, Mesh, MeshStandardMaterial, Vector3 } from 'three';
import { GLTF } from 'three-stdlib';
import { CustomKeyboardKeyTypes } from '@/types/CustomKeyboardTypes';

interface KeyboardNodes {
  nodes: Record<CustomKeyboardKeyTypes | 'Cube', Mesh>;
  materials: Record<CustomKeyboardKeyTypes | 'Cube', MeshStandardMaterial>;
}

export default function Keyboard() {
  const {
    keyboardData: {
      type,
      texture,
      boardColor,
      pointKeyType,
      hasPointKeyCap,
      baseKeyColor,
      pointKeyColor,
      individualColor,
    },
    updateData,
  } = useContext(KeyboardDataContext);

  const { focusKey, updateFocusKey } = useContext(KeyColorContext);
  const { currentStep } = useContext(StepContext);
  const { nodes, materials } = useGLTF(
    type === 'tkl' ? '/glbs/tklKeyboard.glb' : '/glbs/keyboard.glb',
  ) as unknown as GLTF & KeyboardNodes;

  const SCALE = type === 'tkl' ? 3.2 : 0.05;
  const KEY_BUTTONS = type === 'tkl' ? [...KEY] : [...KEY, ...TEN_KEY];
  const MATELNESS = texture === 'metal' ? 0.9 : 0;
  const ROUGHNESS = texture === 'metal' ? 0.1 : 0.7;
  const ROTATION = new Euler(type === 'tkl' ? -1.55 : 0, 0, 0);
  const POSITION = new Vector3(0.1, 0, 0);

  const handleClickKey = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const key = e.object.name as CustomKeyboardKeyTypes;
    if (key === focusKey) {
      updateFocusKey(null);
      return;
    }
    updateFocusKey(key);
    updateData('pointKeyColor', individualColor[key] as Color);
  };

  const getKeyColor = (key: CustomKeyboardKeyTypes) => {
    if (hasPointKeyCap) {
      if (pointKeyType === '내 맘대로 바꾸기' && individualColor[key]) {
        return individualColor[key];
      }
      if (pointKeyType === '세트 구성' && POINT_KEY.includes(key)) {
        return pointKeyColor;
      }
    }
    return baseKeyColor;
  };
  return (
    <group onClick={(e) => currentStep === 'keyCap' && pointKeyType === '내 맘대로 바꾸기' && handleClickKey(e)}>
      <mesh
        geometry={nodes.Cube.geometry}
        material={materials.Cube}
        material-color={boardColor}
        position={POSITION}
        rotation={ROTATION}
        scale={SCALE}
        material-metalness={MATELNESS}
        material-roughness={ROUGHNESS}
        material-opacity={1}
      />
      {KEY_BUTTONS.map((key) => (
        <mesh key={key} name={key} geometry={nodes[key].geometry} position={POSITION} rotation={ROTATION} scale={SCALE}>
          <meshStandardMaterial
            name={key}
            color={getKeyColor(key)}
            opacity={focusKey && focusKey !== key ? 0.4 : 1}
            transparent
          />
        </mesh>
      ))}
    </group>
  );
}