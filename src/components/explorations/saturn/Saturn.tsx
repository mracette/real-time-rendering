import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { DoubleSide, FrontSide } from 'three';
import Vertex from '../../exercises/5.2/shared/VertexShader.vert';
import Planet from './Planet.frag';
import Rings from './Rings.frag';

const SaturnInner = () => {
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <mesh rotation={[Math.PI / 1.8, 0, 0]}>
        <circleGeometry args={[2.2, 64]} />
        <shaderMaterial
          transparent
          fragmentShader={Rings}
          vertexShader={Vertex}
          side={DoubleSide}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <shaderMaterial
          transparent
          fragmentShader={Planet}
          vertexShader={Vertex}
          side={FrontSide}
        />
      </mesh>
    </group>
  );
};

export const Saturn = () => (
  <Canvas>
    <OrbitControls />
    <SaturnInner />
  </Canvas>
);
