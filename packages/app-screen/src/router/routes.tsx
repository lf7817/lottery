import { ErrorElement, SoRouteObject, convertRoutes } from '@lottery/shared/components/Router'
import { Navigate } from 'react-router-dom'
import GameOneLottery from '@/pages/GameOne'

const routeConfig: SoRouteObject[] = [
  {
    path: '/',
    errorElement: <ErrorElement />,
    children: [
      {
        path: 'game-one',
        element: <GameOneLottery />,
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
