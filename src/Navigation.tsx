import { Canvas } from '@react-three/fiber';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { GoochShading } from './components/exercises/5.1/GoochShading/GoochShading';
import { LambertShadingDirectional } from './components/exercises/5.2/5.2.1/LambertShadingDirectional';
import { LambertShadingPunctual } from './components/exercises/5.2/5.2.2/LambertShadingPunctual';
import { LambertShadingSpot } from './components/exercises/5.2/5.2.2/LambertShadingSpot';
import { NoiseComponent } from './components/explorations/Noise';

interface Page {
  name: string;
  chapter: string;
  path: string;
  element: ReactNode;
}

export const pages: Page[] = [
  {
    chapter: '5.1',
    name: 'Gooch Shading',
    path: '/gooch-shading',
    element: (
      <Canvas>
        <GoochShading />
      </Canvas>
    )
  },
  {
    chapter: '5.2.1',
    name: 'Lambert Shading - Directional',
    path: '/lambert-shading-directional',
    element: (
      <Canvas>
        <LambertShadingDirectional />
      </Canvas>
    )
  },
  {
    chapter: '5.2.2',
    name: 'Lambert Shading - Punctual',
    path: '/lambert-shading-punctual',
    element: (
      <Canvas>
        <LambertShadingPunctual />
      </Canvas>
    )
  },
  {
    chapter: '5.2.2',
    name: 'Lambert Shading - Spot',
    path: '/lambert-shading-spot',
    element: (
      <Canvas>
        <LambertShadingSpot />
      </Canvas>
    )
  },
  {
    chapter: 'explorations',
    name: 'Noise',
    path: '/noise',
    element: <NoiseComponent />
  }
];

export const Navigation = () => (
  <ul>
    {pages.map(({ path, name }) => (
      <li key={path} value={path}>
        <Link to={path}>{name}</Link>
      </li>
    ))}
  </ul>
);
