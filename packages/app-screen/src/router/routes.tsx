import { ErrorElement, SoRouteObject, convertRoutes } from '@lottery/shared/components/Router'
import { Navigate } from 'react-router-dom'
import Home from '@/pages/Home'

const routeConfig: SoRouteObject[] = [
  {
    path: '/',
    errorElement: <ErrorElement />,
    children: [
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'setting',
        asyncElement: () => import('@/pages/Settings'),
      },
      {
        path: '/',
        element: <Navigate to="/home" replace />,
      },
    ],
  },
]

const routes = convertRoutes(routeConfig)
export default routes
