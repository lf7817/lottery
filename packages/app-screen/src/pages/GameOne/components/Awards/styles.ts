import * as stylex from '@stylexjs/stylex'

export default stylex.create({
  awards: {
    userSelect: 'none',
  },
  item: (active: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    width: 430,
    height: 120,
    backgroundColor: 'rgba(0, 127, 127, 0.67)',
    border: '1px solid rgba(127, 255, 255, 0.25)',
    color: 'rgba(255,255,0, .9)',
    borderRadius: 10,
    // transform: active ? 'scale(1.2)' : 'scale(1)',
    transformOrigin: 'left center',
    transition: 'all 0.5s ease-in-out',
    position: 'relative',
    overflow: 'hidden',
    padding: '0 20px',
    boxSizing: 'border-box',
    opacity: active ? 1 : 0.7,
    cursor: 'pointer',
    boxShadow: active ? '0 0 15px 0 rgba(0, 255, 255, 0.6)' : undefined,
  }),
  image: (url: string) => ({
    width: 90,
    height: 90,
    borderRadius: '50%',
    backgroundColor: '#fff',
    marginRight: 20,
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }),
  content: {
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'space-between',
    // height: 80,
    // background: 'red',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 500,
  },
  count: {
    color: '#fff',
    marginLeft: 10,
  },
  prize: {
    marginTop: 4,
    color: 'rgba(255,255,0, .9)',
  },
})
