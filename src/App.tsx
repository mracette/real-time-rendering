import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Navigation, pages } from './Navigation';

const router = createBrowserRouter([
  { path: '/', element: <Navigation /> },
  ...pages.map(({ path, element }) => ({ path, element }))
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
