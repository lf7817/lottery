import { Html } from '@react-three/drei'
import { useLayoutEffect, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import * as stylex from '@stylexjs/stylex'
import { useSnapshot } from 'valtio'
import { Group } from 'three'
import { useRequest } from 'ahooks'
import { gameOneAction, gameOneState } from '@/pages/GameOne/store'
import { fetchUserList } from '@/pages/GameOne/store/service.ts'

const styles = stylex.create({
  qrcode: {
    width: 216 * 2,
    height: 252 * 2,
    background: '#CD2B12',
    paddingTop: 32,
    boxSizing: 'border-box',
    borderRadius: 40,
    boxShadow: '0 0 20px 10px rgba(0, 0, 0, 0.5)',
    cursor: 'pointer',
    userSelect: 'none',
  },
  inner: {
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 360,
    height: 360,
    background: '#fff',
    borderRadius: 20,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 36,
    marginTop: 30,
  },
})

export default function Qrcode() {
  const ref = useRef<Group>(null)
  const { qrcode } = useSnapshot(gameOneState)
  console.log(qrcode)
  const url = `${import.meta.env.VITE_HOST}/lottery/sign?activityId=${qrcode}`
  useRequest(() => fetchUserList(qrcode), { refreshDeps: [qrcode], pollingInterval: 1000 })

  useLayoutEffect(() => {
    gameOneAction.generateQRcode()
  }, [])

  function onClick() {
    if (ref.current?.scale.x === 1)
      ref.current?.scale.set(1.5, 1.5, 1.5)
    else
      ref.current?.scale.set(1, 1, 1)
  }

  return (
    <group ref={ref} position={[29.5, 0, 0]}>
      <Html transform>
        <div {...stylex.props(styles.qrcode)} onClick={onClick}>
          <div {...stylex.props(styles.inner)}>
            <QRCodeSVG size={320} value={url} />
          </div>
          <div {...stylex.props(styles.text)}>微信扫一扫参与互动</div>
        </div>
      </Html>
    </group>
  )
}
