import { useRouteError } from 'react-router-dom'
import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  btn: {
    color: '#000',
    cursor: 'pointer',
  },
})

export function ErrorElement() {
  const error = useRouteError()
  console.dir(error)

  return (
    <div {...stylex.props(styles.wrapper)}>
      <div>
        <h1>
          应用出错了
          <br />
          o(╥﹏╥)o
        </h1>
        <button {...stylex.props(styles.btn)} onClick={() => window.location.reload()}>
          重新打开
        </button>
        <button {...stylex.props(styles.btn)} onClick={() => localStorage.clear()}>
          清除缓存
        </button>
      </div>
    </div>
  )
}
