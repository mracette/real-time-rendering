import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Color, IUniform, RawShaderMaterial, Vector3 } from 'three';
import Fragment from './LambertShading.frag';
import Vertex from './LambertShading.vert';

interface BasicLight {
  position: Vector3;
  color: Color;
}

const triangleSide = 3;
const triangleHeight = (triangleSide * Math.sqrt(3)) / 2;
const triangleCenter = triangleHeight / 3;

const surfaceColor = new Color('black');

const lights: BasicLight[] = [
  {
    position: new Vector3(0, triangleHeight - triangleCenter, 0),
    color: new Color(1, 0, 0)
  },
  {
    position: new Vector3(-triangleSide / 2, -triangleCenter, 0),
    color: new Color(0, 1, 0)
  },
  {
    position: new Vector3(triangleSide / 2, -triangleCenter, 0),
    color: new Color(0, 0, 1)
  }
];

const uniforms: Record<string, IUniform> = {
  color: { value: surfaceColor },
  lightCount: { value: lights.length },
  lightPositions: { value: lights.map(({ position }) => position.toArray()).flat(1) },
  lightColors: { value: lights.map(({ color }) => color.toArray()).flat(1) }
};

const material = new RawShaderMaterial({
  fragmentShader: Fragment,
  vertexShader: Vertex,
  uniforms
});

export const LambertShading = () => {
  return (
    <Canvas>
      {lights.map(({ position, color }) => (
        <mesh position={position}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
      <OrbitControls />
      <mesh>
        <sphereGeometry args={[1]} />
        <primitive object={material} attach="material" />
      </mesh>
    </Canvas>
  );
};
