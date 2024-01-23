import { ErrorElement, SoRouteObject, convertRoutes } from '@lottery/shared/components/Router'
import { Navigate } from 'react-router-dom'
import GameOne from '@/pages/GameOne/components/Scene.tsx'

const routeConfig: SoRouteObject[] = [
  {
    path: '/',
    errorElement: <ErrorElement />,
    children: [
      {
        path: 'game-one',
        element: <GameOne />,
      },
      {
        path: 'setting',
        asyncElement: () => import('@/pages/Settings'),
      },
      {
        path: '/',
        element: <Navigate to="/game-one" replace />,
      },
    ],
  },
]

const routes = convertRoutes(routeConfig)
export default routes
