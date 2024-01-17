import { useRouteError } from 'react-router-dom'

export function ErrorElement() {
  const error = useRouteError()
  console.dir(error)

  return (
    <div className="flex h-full w-full">
      <div className="m-auto flex w-80 flex-col text-center text-2xl">
        <h1>
          应用出错了
          <br />
          o(╥﹏╥)o
        </h1>
        <button onClick={() => window.location.reload()}>
          重新打开
        </button>
      </div>
    </div>
  )
}
