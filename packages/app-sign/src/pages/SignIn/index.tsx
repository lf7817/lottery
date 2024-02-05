import { useForm } from 'react-hook-form'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import useRouterParams from '@lottery/shared/hooks/useRouterParams.ts'
import styles from './style.module.css'
import { isWechat } from '@/utils'
import { CacheToken } from '@/contants'
import { UserInfo } from '@/types'
import PageContainer from '@/components/PageContainer'

interface FormData {
  username: string
  mobile: string
}

const schema = z.object({
  username: z.string().trim().min(2, { message: '请正确填写名称' }),
  mobile: z.string().regex(/^1[3-9]\d{9}$/, '请正确填写手机号码'),
})

export default function SignIn() {
  const navigate = useNavigate()
  const { activityId } = useRouterParams()
  const userinfo = useRef<UserInfo>(JSON.parse(localStorage.getItem(CacheToken.USER_INFO)!))
  const [hasSignin, setSignin] = useState(false)
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    if (!userinfo.current)
      navigate({ pathname: '/auth' })
    else
      queryHasSignIn()
  }, [])

  async function submit(data: FormData) {
    const body: FetchSigninParams = {
      username: data.username,
      mobile: data.mobile,
      activityId: activityId!,
      openid: userinfo.current!.openid,
      headimgurl: userinfo.current!.headimgurl,
    }

    fetchSignin(body)
      .then(res => res.json())
      .then(() => {
        setSignin(true)
      })
  }

  async function queryHasSignIn() {
    fetchHasSignin({
      activityId: activityId!,
      openid: userinfo.current!.openid,
    })
      .then(res => res.json())
      .then((res) => {
        if (res.code === 0 && !!res.data)
          setSignin(true)
        else
          setSignin(false)
      })
  }

  if (!isWechat())
    return <div>请使用微信扫一扫</div>

  if (!activityId)
    return <div>路由参数错误</div>

  if (hasSignin) {
    return (
      <PageContainer>
        <div className={styles.wrapper}>
          <div className={styles.avatar} style={{ backgroundImage: `url(${userinfo.current?.headimgurl})` }} />
          <div className={styles.success}>
            {/* <div className={styles.successTitle}>姓名</div> */}
            <div className={styles.successDesc}>
              您已成功签到，感谢您的参与！
              <br />
              抽奖结果请关注大屏
            </div>
          </div>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <div className={styles.wrapper}>
        <div className={styles.avatar} style={{ backgroundImage: `url(${userinfo.current?.headimgurl})` }} />
        <form className={styles.form} onSubmit={handleSubmit(submit)}>
          <div className={styles.item}>
            <label className={styles.label}>姓名</label>
            <input className={styles.input} {...register('username')} />

          </div>
          { formState.errors.username?.message && <div className={styles.error}>{formState.errors.username.message}</div> }
          <div className={styles.item}>
            <label className={styles.label}>手机号</label>
            <input className={styles.input} {...register('mobile')} />
          </div>
          { formState.errors.mobile?.message && <div className={styles.error}>{formState.errors.mobile.message}</div> }
          <button type="submit" className={styles.submit}>提交</button>
        </form>
      </div>
    </PageContainer>
  )
}

interface FetchSigninParams {
  username: string
  mobile: string
  activityId: string
  openid: string
  headimgurl: string
}

async function fetchSignin(data: FetchSigninParams) {
  return fetch(`/lottery-api/sign-in`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

interface FetchHasSigninParams {
  activityId: string
  openid: string
}

async function fetchHasSignin(data: FetchHasSigninParams) {
  return fetch(`/lottery-api/sign-in/hasSignIn`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}
