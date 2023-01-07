import { RotationLightScene } from '../shared/RotatingLightScene';
import Vertex from '../shared/VertexShader.vert';
import Fragment from './LambertShadingPunctual.frag';

export const LambertShadingPunctual = () => (
  <RotationLightScene fragmentShader={Fragment} vertexShader={Vertex} />
);
