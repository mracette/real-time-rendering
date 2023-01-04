import path from 'path';
import React, { ReactNode } from 'react';
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom';
import { GoochShading } from './components/exercises/GoochShading/GoochShading';
import { Navigation, pages } from './Navigation';

const router = createBrowserRouter([
  { path: '/', element: <Navigation /> },
  ...pages.map(({ path, element }) => ({ path, element }))
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
