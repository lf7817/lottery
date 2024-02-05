import { useRef } from 'react'

export default function useRouterParams() {
  const params = useRef(new URLSearchParams(window.location.search))
  const rtn: Record<string, string | undefined> = {}

  for (const [key, value] of params.current.entries())
    rtn[key] = value

  return rtn
}
