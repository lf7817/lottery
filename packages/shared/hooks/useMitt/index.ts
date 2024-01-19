import { useContext, useEffect, useRef } from 'react'
import { MittContext } from './context.ts'

export { MittProvider } from './MittProvider'

interface Event {
  key: string
  e: (...args: any[]) => any
}

export default function useMitt() {
  const event = useContext(MittContext)
  const eventRef = useRef<Event[]>([])

  const on = (key: string, e: (...args: any[]) => any) => {
    eventRef.current.push({ key, e })
    event.on(key, e)
  }

  useEffect(() => {
    return () => {
      eventRef.current.forEach(item => event.off(item.key, item.e))
    }
  }, [])

  return {
    on,
    off: event.off,
    emit: event.emit,
  }
}
