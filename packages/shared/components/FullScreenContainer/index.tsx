import { FC, PropsWithChildren } from 'react'
import { useClientSize } from '../../hooks/useClientSize'

interface Props {
  designWidth: number
  designHeight: number
  bodyScale: boolean
  bodyColor?: string
}

const FullScreenWebContainer: FC<PropsWithChildren<Props>> = (props) => {
  const { designWidth, designHeight, children, bodyScale, bodyColor = '#000' } = props
  const { width, height } = useClientSize()
  const ratio = designHeight / designWidth
  const wHeight: number = width * ratio // 期望高度
  let scale = 1
  if (height < wHeight) {
    // 以真实高度为基准等比例缩放
    scale = height / designHeight
  }
  else {
    scale = width / designWidth
  }

  const rw = designWidth * scale
  const rh = designHeight * scale

  document.body.style.width = `${designWidth}px`
  document.body.style.height = `${designHeight}px`

  if (bodyScale) {
    document.body.style.transformOrigin = '0 0'
    document.body.style.transform = `scale(${scale})`
    document.body.style.margin = `${(height - rh) / 2}px ${(width - rw) / 2}px`
    document.body.style.overflow = `hidden`
    document.body.style.background = bodyColor
    document.getElementById('root')!.style.width = '100%'
    document.getElementById('root')!.style.height = '100%'
  }
  else {
    document.body.style.overflow = `auto`
  }

  return <>{children}</>
}

export default FullScreenWebContainer
