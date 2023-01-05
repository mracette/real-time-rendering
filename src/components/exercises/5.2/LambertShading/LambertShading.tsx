import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Color, Group, Mesh, MeshBasicMaterial, RawShaderMaterial, Vector3 } from 'three';
import Fragment from './LambertShading.frag';
import Vertex from './LambertShading.vert';

const surfaceColor = new Color('black');

export const LambertShading = () => {
  const shaderMaterialRef = useRef<RawShaderMaterial>(null);
  const uniformsRef = useRef<any>({
    color: { value: surfaceColor },
    lightCount: {
      value: 0
    },
    lightPositions: {
      value: []
    },
    lightColors: {
      value: []
    }
  });
  const [lightsGroup, setLightsGroup] = useState<Group | null>(null);

  useLayoutEffect(() => {
    if (!lightsGroup || lightsGroup.children.length) return;

    uniformsRef.current.lightCount.value = lightsGroup.children.length;
    uniformsRef.current.lightPositions.value = lightsGroup.children.map(
      (light) => light.position
    );
    uniformsRef.current.lightColors.value = lightsGroup.children.map((light) => {
      const mesh = light as Mesh;
      const material = mesh.material as MeshBasicMaterial;
      return new Vector3(...material.color.toArray());
    });

    shaderMaterialRef.current?.dispose();

    if (shaderMaterialRef.current) {
      shaderMaterialRef.current.needsUpdate = true;
      shaderMaterialRef.current.uniformsNeedUpdate = true;
    }
  }, [lightsGroup, lightsGroup?.children.length]);

  return (
    <Canvas>
      <OrbitControls />
      <group ref={(group) => setLightsGroup(group)}>
        <mesh position={[1, 1, 0]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshBasicMaterial color="red" />
        </mesh>
        <mesh position={[-1, 1, 0]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshBasicMaterial color="green" />
        </mesh>
        <mesh position={[-1, -1, 0]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshBasicMaterial color="blue" />
        </mesh>
        <mesh position={[1, -1, 0]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshBasicMaterial color="yellow" />
        </mesh>
      </group>
      {lightsGroup && (
        <mesh>
          <dodecahedronGeometry args={[1, 1]} />
          <rawShaderMaterial
            ref={shaderMaterialRef}
            fragmentShader={Fragment}
            vertexShader={Vertex}
            uniforms={uniformsRef.current}
          ></rawShaderMaterial>
        </mesh>
      )}
    </Canvas>
  );
};
