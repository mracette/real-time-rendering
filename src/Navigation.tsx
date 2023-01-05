import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { GoochShading } from './components/exercises/5.1/GoochShading/GoochShading';
import { LambertShading } from './components/exercises/5.2/LambertShading/LambertShading';

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
    chapter: '5.2',
    name: 'Lambert Shading',
    path: '/lambert-shading',
    element: <LambertShading />
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
