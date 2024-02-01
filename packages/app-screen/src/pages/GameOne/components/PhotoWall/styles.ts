import * as stylex from '@stylexjs/stylex'

export default stylex.create({
  card: (highlight: boolean) => ({
    'width': 140 / 4 * 3,
    'height': 140,
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
  btn: {
    color: '#fff',
    background: 'rgba(249, 192, 94, 0.7)',
    boxShadow: '0 0 20px 10px rgba(0,0,0,0.2)',
  },
})
