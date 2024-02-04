import { ErrorElement, SoRouteObject, convertRoutes } from '@lottery/shared/components/Router'
import { Navigate } from 'react-router-dom'
import GameOneLayout from '@/pages/GameOne'
import GameOneLottery from '@/pages/GameOne/pages/Lottery.tsx'
import GameOneGreating from '@/pages/GameOne/pages/Greating.tsx'

const routeConfig: SoRouteObject[] = [
  {
    path: '/',
    errorElement: <ErrorElement />,
    children: [
      {
        path: 'game-one',
        element: <GameOneLayout />,
        children: [
          {
            path: 'greating',
            element: <GameOneGreating />,
          },
          {
            path: 'lottery',
            element: <GameOneLottery />,
          },
        ],
      },
      {
        path: '/',
        element: <Navigate to="/game-one/greating" replace />,
      },
    ],
  },
]

const routes = convertRoutes(routeConfig)
export default routes
