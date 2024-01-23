import { useContext, useEffect, useRef } from 'react'
import { Emitter, EventType, Handler } from 'mitt'
import { MittContext } from './context.ts'

export { MittProvider } from './MittProvider'

export default function useMitt<T = Record<EventType, unknown>>() {
  // @ts-expect-error
  const event: Emitter<T> = useContext(MittContext)
  const eventRef = useRef<any[]>([])

  function on<Key extends keyof T>(key: Key, e: Handler<T[Key]>) {
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
