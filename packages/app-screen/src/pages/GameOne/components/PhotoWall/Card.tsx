import * as stylex from '@stylexjs/stylex'
import { Person } from '@/types'

interface CardProps {
  win?: boolean
  person?: Person
  highlight?: boolean
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
})

export default function Card({ person, highlight }: CardProps) {
  // console.log(win)
  return (
    <div {...stylex.props(styles.card(!!highlight))}>
      {!!person?.headimgurl && <div {...stylex.props(styles.avatar(person?.headimgurl))} />}
      <div {...stylex.props(styles.mobile)}>{person?.mobile?.slice(7) ?? '--'}</div>
      <div {...stylex.props(styles.name)}>{person?.username ?? '待加入'}</div>
    </div>
  )
}
