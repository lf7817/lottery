import { useEffect, useState } from 'react'
import debounce from 'lodash.debounce'

export function useClientSize() {
  const [size, setSize] = useState(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
    outerWidth: window.outerWidth,
    outerHeight: window.outerHeight,
  }))

  useEffect(() => {
    const setSizeHandler = debounce(() => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
        outerWidth: window.outerWidth,
        outerHeight: window.outerHeight,
      })
    }, 100)

    window.addEventListener('resize', setSizeHandler)

    return () => {
      window.removeEventListener('resize', setSizeHandler)
    }
  }, [])

  return size
}
