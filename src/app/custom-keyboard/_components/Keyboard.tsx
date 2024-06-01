'use client';

import { KEY, TEN_KEY } from '@/constants/keyboardData';
import { KeyColorContext, KeyboardDataContext } from '@/context/customKeyboardContext';
import { useGLTF } from '@react-three/drei';
import { useContext } from 'react';
import { Mesh, MeshStandardMaterial } from 'three';
import { GLTF } from 'three-stdlib';
/* eslint-disable */

interface KeyboardNodes {
  nodes: { [key: string]: Mesh };
  materials: { [key: string]: MeshStandardMaterial };
}

export default function Keyboard() {
  const {
    keyboardData: { keyboardType, texture, boardColor },
  } = useContext(KeyboardDataContext);

  const { keyColorData } = useContext(KeyColorContext);

  const { nodes, materials } = useGLTF(
    keyboardType === 'tkl' ? '/glbs/tklKeyboard.glb' : '/glbs/keyboard.glb',
  ) as unknown as GLTF & KeyboardNodes;

  const SCALE = keyboardType === 'tkl' ? 3.2 : 0.05;
  const KEY_BUTTONS = keyboardType === 'tkl' ? [...KEY] : [...KEY, ...TEN_KEY];
  const MATELNESS = texture === 'metal' ? 0.9 : 0;
  const ROUGHNESS = texture === 'metal' ? 0.2 : 0.7;

  return (
    <group>
      <mesh
        geometry={nodes.Cube.geometry}
        material={materials.Cube}
        material-color={boardColor}
        position={[0.1, 0, 0]}
        rotation={keyboardType === 'tkl' ? [-1.55, 0, 0] : [0, 0, 0]}
        scale={SCALE}
        material-metalness={MATELNESS}
        material-roughness={ROUGHNESS}
      />
      {KEY_BUTTONS.map((key) => (
        <mesh
          key={key}
          geometry={nodes[key].geometry}
          position={[0.1, 0, 0]}
          rotation={keyboardType === 'tkl' ? [-1.55, 0, 0] : [0, 0, 0]}
          scale={SCALE}
        >
          <meshStandardMaterial color={keyColorData[key]} opacity={1} transparent={true} />
        </mesh>
      ))}
    </group>
  );
}
