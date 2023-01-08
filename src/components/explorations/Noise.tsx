import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { LayerMaterial, Color, Noise } from 'lamina';
import { DoubleSide } from 'three';
import Vertex from '../exercises/5.2/shared/VertexShader.vert';
import Fragment from './Noise.frag';

const NoiseInner = () => {
  return (
    <group>
      <mesh rotation={[Math.PI / 1.8, 0, 0]}>
        <circleGeometry args={[2, 32]} />
        <shaderMaterial
          fragmentShader={Fragment}
          vertexShader={Vertex}
          side={DoubleSide}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <LayerMaterial color="#00ff00" lighting="basic" attach="material">
          <Noise type="simplex" />
          <Color color={'red'} alpha={0.5} />
        </LayerMaterial>
      </mesh>
    </group>
  );
};

export const NoiseComponent = () => (
  <Canvas>
    <OrbitControls />
    <NoiseInner />
  </Canvas>
);
