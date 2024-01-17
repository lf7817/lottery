import type { ComponentType, FC } from 'react'
import { Suspense } from 'react'

export const AsyncElement: FC<{ component: ComponentType }> = (props) => {
  const { component: Component } = props
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Component />
    </Suspense>
  )
}
