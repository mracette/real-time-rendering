import { OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { memo, useMemo, useRef } from 'react';
import { Color, Group, IUniform, Matrix4, Mesh, Vector3 } from 'three';
import Fragment from './LambertShadingPunctual.frag';
import Vertex from './LambertShadingPunctual.vert';

const surfaceColor = new Color('black');
const lightColors = [new Color(1, 0, 0), new Color(0, 1, 0), new Color(0, 0, 1)];

export const LambertShadingPunctual = () => {
  const lightsRef = useRef<Group>(null);

  const uniforms = useMemo<Record<string, IUniform>>(
    () => ({
      color: { value: surfaceColor },
      lightCount: { value: lightColors.length },
      lightPositions: {
        value: new Array(lightColors.length * 3).fill(0)
      },
      lightColors: { value: lightColors.map((color) => color.toArray()).flat(1) }
    }),
    []
  );

  useFrame(({ clock }, delta) => {
    if (!lightsRef.current) return;

    lightsRef.current.rotateZ(delta * 0.1);
    lightsRef.current.rotateY(delta * 0.5);

    lightsRef.current.children.forEach((mesh, i, array) => {
      const translateX = Math.sin(
        clock.elapsedTime + (Math.PI * 2 * (i % array.length)) / array.length
      );

      const translation = new Matrix4();
      translation.makeTranslation(2.5 + translateX, 0, 0);

      mesh.matrix.makeRotationZ(Math.PI * 2 * (i / array.length));
      mesh.matrix.multiply(translation);

      const target = new Vector3();
      mesh.getWorldPosition(target);

      uniforms.lightPositions.value[i * 3] = target.x;
      uniforms.lightPositions.value[i * 3 + 1] = target.y;
      uniforms.lightPositions.value[i * 3 + 2] = target.z;
    });
  });

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
      <group ref={lightsRef}>
        {lightColors.map((color, i) => (
          <mesh key={i} matrixAutoUpdate={false}>
            <sphereGeometry args={[0.1, 32, 32]} />
            <meshBasicMaterial color={color} />
          </mesh>
        ))}
      </group>
      <OrbitControls />
      <mesh>
        <sphereGeometry args={[1]} />
        <ShaderMaterial uniforms={uniforms} />
      </mesh>
    </>
  );
};
