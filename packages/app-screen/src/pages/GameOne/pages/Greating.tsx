import * as stylex from '@stylexjs/stylex'
import { useNavigate } from 'react-router-dom'
import greating from '../../../../public/video/great.mp4'
import btn from '../../../../public/video/btn.png'

const styles = stylex.create({
  btn: (url: string) => ({
    position: 'absolute',
    top: 730,
    left: 200,
    width: '266px',
    height: '54px',
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    cursor: 'pointer',
    zIndex: 10,
  }),
})

export default function GameOneGreating() {
  const navigate = useNavigate()
  return (
    <div style={{ position: 'relative' }}>
      <div {...stylex.props(styles.btn(btn))} onClick={() => navigate('/game-one/lottery')} />
      <video src={greating} style={{ width: '100%', height: '100%' }} controls={false} loop autoPlay muted={true} disablePictureInPicture={false} />
    </div>
  )
}
