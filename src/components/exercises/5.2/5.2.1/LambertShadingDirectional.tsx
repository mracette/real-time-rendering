import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { equilateralTriangle } from 'crco-utils';
import { memo, useMemo } from 'react';
import { Color, IUniform, RawShaderMaterial, Vector3 } from 'three';
import Fragment from './LambertShadingDirectional.frag';
import Vertex from './LambertShadingDirectional.vert';

const surfaceColor = new Color('black');

// Flip for Y-up orientation
const triangle = equilateralTriangle(0, 0, 3).map(([x, y]) => new Vector3(x, -y, 0));

interface BasicLight {
  position: Vector3;
  color: Color;
}

const lights: BasicLight[] = [
  {
    position: triangle[0],
    color: new Color(1, 0, 0)
  },
  {
    position: triangle[1],
    color: new Color(0, 1, 0)
  },
  {
    position: triangle[2],
    color: new Color(0, 0, 1)
  }
];

export const LambertShadingDirectional = () => {
  const uniforms = useMemo<Record<string, IUniform>>(
    () => ({
      color: { value: surfaceColor },
      lightCount: { value: lights.length },
      lightPositions: { value: lights.map(({ position }) => position.toArray()).flat(1) },
      lightColors: { value: lights.map(({ color }) => color.toArray()).flat(1) }
    }),
    []
  );

  // Three.js doesn't support updating the uniforms object after the initial render, so if it changes we need to create a new material.
  // Practically speaking, this allows code changes to the uniforms to be picked up by hot reloading.
  const ShaderMaterial = memo(({ uniforms }: { uniforms: Record<string, IUniform> }) => (
    <rawShaderMaterial
      fragmentShader={Fragment}
      vertexShader={Vertex}
      uniforms={uniforms}
    />
  ));

  return (
    <>
      {lights.map(({ position, color }) => (
        <mesh position={position}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
      <OrbitControls />
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <ShaderMaterial uniforms={uniforms} />
      </mesh>
    </>
  );
};
