'use client';

import { KEY, TEN_KEY } from '@/constants/keyboardData';
import { useGLTF } from '@react-three/drei';
import { Mesh, MeshStandardMaterial } from 'three';
import { GLTF } from 'three-stdlib';
/* eslint-disable */
const KEY_BUTTONS = [...KEY, ...TEN_KEY];

interface KeyboardNodes {
  nodes: { [key: string]: Mesh };
  materials: { [key: string]: MeshStandardMaterial };
}

export default function Keyboard() {
  const { nodes, materials } = useGLTF('/glbs/keyboard.glb') as unknown as GLTF & KeyboardNodes;

  return (
    <group>
      <mesh
        geometry={nodes.Cube.geometry}
        material={materials.Cube}
        material-color={'#ffffff'}
        position={[0.2, 0, 0]}
        rotation={[1.6, 0, 0]}
        scale={0.1}
      />
      {KEY_BUTTONS.map((key) => (
        <mesh key={key} geometry={nodes[key].geometry} position={[0.2, 0, 0]} rotation={[1.6, 0, 0]} scale={0.1}>
          <meshStandardMaterial color={'#ffffff'} opacity={1} transparent={true} />
        </mesh>
      ))}
    </group>
  );
}
