import * as stylex from '@stylexjs/stylex'

export const commonStyles = stylex.create({
  button: (opacity: boolean) => ({
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
    'width': 160 * 1.5,
    'height': 60 * 1.5,
    'marginLeft': -80,
    'color': '#f9c05e',
    'fontSize': 24 * 1.5,
    'fontWeight': 'bold',
    'border': '2px solid #f9c05e',
    'boxShadow': '0 0 6px rgba(249, 192, 94, 1)',
    'cursor': 'pointer',
    'userSelect': 'none',
    'transition': 'opacity 0.5s ease-in-out',
    'transform': 'translateY(300px)',
    'opacity': opacity ? 1 : 0,
    'borderRadius': 10 * 1.5,
    ':hover': {
      background: '#f9c05e',
      color: '#fff',
    },
  }),
})
