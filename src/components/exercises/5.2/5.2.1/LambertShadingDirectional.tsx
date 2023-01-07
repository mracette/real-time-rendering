import { RotationLightScene } from '../shared/RotatingLightScene';
import Vertex from '../shared/VertexShader.vert';
import Fragment from './LambertShadingDirectional.frag';

export const LambertShadingDirectional = () => (
  <RotationLightScene fragmentShader={Fragment} vertexShader={Vertex} />
);
