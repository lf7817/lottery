import { ErrorElement, SoRouteObject, convertRoutes } from '@lottery/shared/components/Router'
import { Navigate } from 'react-router-dom'
import GameOnePage from '@/pages/GameOne'

const routeConfig: SoRouteObject[] = [
  {
    path: '/',
    errorElement: <ErrorElement />,
    children: [
      {
        path: 'game-one',
        element: <GameOnePage />,
      },
      {
        path: 'setting',
        asyncElement: () => import('@/pages/Settings'),
      },
      {
        path: 'greating',
        asyncElement: () => import('@/pages/Greating'),
      },
      {
        path: '/',
        element: <Navigate to="/greating" replace />,
      },
    ],
  },
]

const routes = convertRoutes(routeConfig)
export default routes
