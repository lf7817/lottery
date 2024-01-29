import { ErrorElement } from '@lottery/shared/components/Router'
import { Navigate, RouteObject } from 'react-router-dom'
import SignIn from '@/pages/SignIn'
import Auth from '@/pages/Auth'

export default [
  {
    path: '/',
    errorElement: <ErrorElement />,
    children: [
      {
        path: 'sign-in',
        element: <SignIn />,
      },
      {
        path: 'auth',
        element: <Auth />,
      },
      {
        path: '/',
        element: <Navigate to="/auth" replace />,
      },
    ],
  },
] as RouteObject[]
