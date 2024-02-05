import * as stylex from '@stylexjs/stylex'
const rotoImg = stylex.keyframes({
  '0%': {transform:'rotate(0deg)'},
  '100%': {transform:'rotate(360deg)'},
})
export default stylex.create({
  wrapper: {
    width: '100%',
    height: '100%',
    // backgroundColor: '#CD2B12',
  },
  btn: (url: string,play:boolean) => ({
    position: 'absolute',
    top: 20,
    right: 30,
    width: '60px',
    height: '60px',
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    cursor: 'pointer',
    zIndex: 10,
    animation: play?`${rotoImg} 6s linear infinite`:null
  }),
})
