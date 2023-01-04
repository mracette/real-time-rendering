import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { GoochShading } from './components/exercises/GoochShading/GoochShading';

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
