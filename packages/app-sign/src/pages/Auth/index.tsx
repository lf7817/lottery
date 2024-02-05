import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useRouterParams from '@lottery/shared/hooks/useRouterParams.ts'
import styles from './style.module.css'
import { CacheToken } from '@/contants'
import { isWechat } from '@/utils'

export default function Auth() {
  const navigate = useNavigate()
  const { code } = useRouterParams()
  const targetUrl = encodeURIComponent(`${window.location.href}`)

  useEffect(() => {
    if (localStorage.getItem(CacheToken.USER_INFO)) {
      navigate({ pathname: '/sign-in' })
    } else if (code) {
      fetchWxUserInfo(code)
        .then(res => res.json())
        .then((res) => {
          if (res.code === 0) {
            localStorage.setItem(CacheToken.USER_INFO, JSON.stringify(res.data))
            navigate({ pathname: '/sign-in' })
          }
        })
    }
  }, [])

  if (!isWechat())
    return <div>请使用微信扫一扫</div>

  return (
    <div className={styles.wrapper}>
      <div className={styles.auth}>
        <div className={styles.authTitle}>授权登录</div>
        <div className={styles.authDesc}>请点击下方按钮进行授权登录</div>
        <div className={styles.authBtn} onClick={() => location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${import.meta.env.VITE_WECHAT_APPID}&redirect_uri=${targetUrl}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`}>
          授权登录
        </div>
      </div>
    </div>
  )
}

async function fetchWxUserInfo(code: string) {
  return fetch(`/lottery-api/wx/userinfo?code=${code}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
