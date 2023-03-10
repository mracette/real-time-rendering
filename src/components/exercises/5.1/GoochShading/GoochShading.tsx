import { OrbitControls } from '@react-three/drei';
import { Vector3 } from 'three';
import Fragment from './GoochShading.frag';
import Vertex from './GoochShading.vert';

export const GoochShading = () => {
  return (
    <>
      <OrbitControls />
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <shaderMaterial
          fragmentShader={Fragment}
          vertexShader={Vertex}
          uniforms={{
            lightDirection: {
              value: new Vector3(1, 1, 1)
            }
          }}
        />
      </mesh>
    </>
  );
};
