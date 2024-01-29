import { useForm } from 'react-hook-form'
import { useRef } from 'react'
import styles from './style.module.css'
import { isWechat } from '@/utils'
import { CacheToken } from '@/contants'
import useRouterParams from '@/hooks/useRouterParams.ts'

export default function SignIn() {
  const userinfo = useRef(JSON.parse(localStorage.getItem(CacheToken.USER_INFO)!))
  const lastActivityId = useRef(localStorage.getItem(CacheToken.ACTIVITY_ID)!)
  const { activityId } = useRouterParams()
  const { register, handleSubmit } = useForm()

  console.log(activityId, userinfo)

  if (!isWechat())
    return <div>请使用微信扫一扫</div>

  if (!activityId)
    return <div>路由参数错误</div>

  if (lastActivityId.current === activityId)
    return <div>您已经签到过了</div>

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(data => console.log(data))}>
        <div>
          <label>姓名:</label>
          <br />
          <input {...register('username')} />
        </div>

        <div>
          <label>手机号:</label>
          <br />
          <input {...register('mobile', { required: true })} />
        </div>

        <button type="submit">提交</button>
      </form>
    </div>
  )
}
