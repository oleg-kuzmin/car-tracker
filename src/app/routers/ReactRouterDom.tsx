import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HomePage } from '@/pages/home';

const router = createBrowserRouter([
  {
    path: '/car-tracker/',
    element: <HomePage />,
  },
]);

export function ReactRouterDom() {
  return <RouterProvider router={router} />;
}
