import mitt from 'mitt'
import { createContext } from 'react'

export const event = mitt()

export const MittContext = createContext(event)
