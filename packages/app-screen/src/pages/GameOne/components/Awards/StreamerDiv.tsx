import * as stylex from '@stylexjs/stylex'
import { FC, ReactElement } from 'react'

interface Props {
  active: boolean
  content: ReactElement
}
const animate1 = stylex.keyframes({
  '0%': { left: '-100%' },
  '50%': { left: '100%' },
  '100%': { left: '100%' },
})
const animate2 = stylex.keyframes({
  '0%': { top: '-100%' },
  '50%': { top: '100%' },
  '100%': { top: '100%' },
})
const animate3 = stylex.keyframes({
  '0%': { right: '-100%' },
  '50%': { right: '100%' },
  '100%': { right: '100%' },
})
const animate4 = stylex.keyframes({
  '0%': { bottom: '-100%' },
  '50%': { bottom: '100%' },
  '100%': { bottom: '100%' },
})
const styles = stylex.create({
  spinner: active => ({
    transform: active ? 'scale(1.2)' : 'scale(1)',
    transformOrigin: 'left center',
    transition: 'all 0.5s ease-in-out',
    position: 'relative',
    overflow: 'hidden',
    margin: active ? '30px 0' : '20px 0',
    borderRadius: 10,
  }),
  spin: {
    'position': 'absolute',
    'display': 'block',
    ':nth-child(1)': {
      top: 0,
      left: 0,
      width: '100%',
      height: '5px',
      background: 'linear-gradient(90deg,transparent,#03e9f4)',
      animation: `${animate1} 1s linear infinite`,
    },
    ':nth-child(2)': {
      top: '-100%',
      right: 0,
      width: '5px',
      height: '100%',
      background: 'linear-gradient(180deg,transparent,#03e9f4)',
      animation: `${animate2} 1s linear infinite`,
      animationDelay: '0.25s',
    },
    ':nth-child(3)': {
      bottom: 0,
      right: 0,
      width: '100%',
      height: '5px',
      background: 'linear-gradient(270deg,transparent,#03e9f4)',
      animation: `${animate3} 1s linear infinite`,
      animationDelay: '0.50s',
    },
    ':nth-child(4)': {
      bottom: '-100%',
      left: 0,
      width: '5px',
      height: '100%',
      background: 'linear-gradient(360deg,transparent,#03e9f4)',
      animation: `${animate4} 1s linear infinite`,
      animationDelay: '0.75s',
    },
  },

})

export const StreamerDiv: FC<Props> = ({ active, content }) => {
  return (
    <div {...stylex.props(styles.spinner(active))}>
      {active && (
        <>
          <span {...stylex.props(styles.spin)}></span>
          <span {...stylex.props(styles.spin)}></span>
          <span {...stylex.props(styles.spin)}></span>
          <span {...stylex.props(styles.spin)}></span>
        </>
      )}
      {content}
    </div>
  )
}
