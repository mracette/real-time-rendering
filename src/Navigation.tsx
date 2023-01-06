import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { GoochShading } from './components/exercises/5.1/GoochShading/GoochShading';
import { LambertShadingDirectional } from './components/exercises/5.2/5.2.1/LambertShadingDirectional';
import { LambertShadingPunctual } from './components/exercises/5.2/5.2.2/LambertShadingPunctual';

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
    element: <GoochShading />
  },
  {
    chapter: '5.2.1',
    name: 'Lambert Shading - Directional',
    path: '/lambert-shading-directional',
    element: <LambertShadingDirectional />
  },
  {
    chapter: '5.2.2',
    name: 'Lambert Shading - Punctual',
    path: '/lambert-shading-punctual',
    element: <LambertShadingPunctual />
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
