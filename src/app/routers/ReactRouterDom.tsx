import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HomePage } from '@/pages/home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
]);

export function ReactRouterDom() {
  return <RouterProvider router={router} />;
}
