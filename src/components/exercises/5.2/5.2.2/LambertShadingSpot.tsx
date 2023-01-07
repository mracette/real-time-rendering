import { RotationLightScene } from '../shared/RotatingLightScene';
import Vertex from '../shared/VertexShader.vert';
import Fragment from './LambertShadingSpot.frag';

export const LambertShadingSpot = () => (
  <RotationLightScene fragmentShader={Fragment} vertexShader={Vertex} />
);
