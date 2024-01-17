import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import type { SoRouteObject } from './types'
import { AsyncElement } from './AsyncElement.tsx'

export function convertRoutes(routes: SoRouteObject[]): RouteObject[] {
  return routes.map((route) => {
    const { element, children, asyncElement, ...rest } = route
    return {
      ...rest,
      element: asyncElement ? <AsyncElement component={lazy(asyncElement)} /> : element,
      children: children ? convertRoutes(children) : [],
    } as RouteObject
  })
}
