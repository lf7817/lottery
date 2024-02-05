import * as stylex from '@stylexjs/stylex'
import { useState } from 'react'
import bgWinner from '../../assets/bg-winner.png'
import { Person } from '@/types'

interface CardProps {
  win?: boolean
  person?: Person
  highlight?: boolean
  onRemove: (openid: string) => void
}

const styles = stylex.create({
  card: (highlight: boolean) => ({
    'position': 'relative',
    'width': 140 / 4 * 3,
    'height': 140,
    'marginLeft': -70 / 4 * 3,
    'color': highlight ? '#C40E17' : '#E6B175',
    'backgroundColor': highlight ? '#E6B175' : 'rgba(0,0,0, 0.3)',
    'overflow': 'hidden',
    'borderRadius': 6,
    'userSelect': 'none',
    'boxShadow': '0 0 12px rgba(249, 192, 94, 1)',
    'cursor': 'pointer',
    ':hover': {
      boxShadow: highlight ? '0 0 30px rgba(0,0,0,0.4)' : '0 0 20px rgba(255, 220,100, 1)',
      border: highlight ? '2px solid #fff' : '2px solid #F9C05E',
    },
  }),
  mobile: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 500,
    marginTop: 30,
  },
  name: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 600,
    marginTop: 10,
  },
  avatar: url => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }),
  username: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 18,
    color: '#c82121',
    fontWeight: 500,
  },
  phone: {
    textAlign: 'center',
    fontSize: 12,
    color: '#c82121',
    fontWeight: 400,
  },
  headimgurl: (url: string) => ({
    width: 30,
    height: 30,
    margin: '22px auto 0',
    borderRadius: '50%',
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    border: '1px solid rgba(255, 170, 0, 1)',
  }),
  wrapper: (url: string) => ({
    position: 'relative',
    width: 140 / 4 * 3,
    height: 140,
    marginLeft: -70 / 4 * 3,
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    overflow: 'hidden',
    borderRadius: 6,
    userSelect: 'none',
    boxShadow: '0 0 12px rgba(249, 192, 94, 1)',
  }),
  cancel: (hover: boolean) => ({
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 24,
    cursor: 'pointer',
    opacity: hover ? 1 : 0,
    transition: 'opacity 0.3s',
  }),
})

export default function Card({ person, highlight, win, onRemove }: CardProps) {
  const [hover, setHover] = useState('')

  if (!win) {
    return (
      <div {...stylex.props(styles.card(!!highlight))}>
        {!!person?.headimgurl && <div {...stylex.props(styles.avatar(person?.headimgurl))} />}
        <div {...stylex.props(styles.mobile)}>{person?.mobile?.slice(7) ?? '--'}</div>
        <div {...stylex.props(styles.name)}>{person?.username ?? '待加入'}</div>
      </div>
    )
  }

  return (
    <div {...stylex.props(styles.wrapper(bgWinner))} onMouseEnter={() => setHover(person?.openid || '')} onMouseLeave={() => setHover('')}>
      <div {...stylex.props(styles.headimgurl(person?.headimgurl || ''))} />
      <div {...stylex.props(styles.username)}>{person?.username}</div>
      <div {...stylex.props(styles.phone)}>{person?.mobile.slice(7)}</div>
      <div
        {...stylex.props(styles.cancel(hover === person?.openid))}
        onClick={() => {
          onRemove(person!.openid)
          setHover('')
        }}
      >
        x
      </div>
    </div>
  )
}
