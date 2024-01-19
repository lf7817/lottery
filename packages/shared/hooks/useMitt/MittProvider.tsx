import { FC, ReactNode } from 'react'
import { MittContext, event } from './context.ts'

export const MittProvider: FC<{ children: ReactNode }> = props => (
  <MittContext.Provider value={event}>{props.children}</MittContext.Provider>
)
