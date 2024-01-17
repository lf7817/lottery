import { ComponentType } from 'react'
import { IndexRouteObject, NonIndexRouteObject } from 'react-router-dom'

type AsyncComponent = () => Promise<{ default: ComponentType }>

interface SoNonIndexRouteObject extends NonIndexRouteObject {
  asyncElement?: AsyncComponent
  children?: SoRouteObject[]
}

interface SoIndexRouteObject extends IndexRouteObject {
  asyncElement?: AsyncComponent
}

export type SoRouteObject = SoIndexRouteObject | SoNonIndexRouteObject
