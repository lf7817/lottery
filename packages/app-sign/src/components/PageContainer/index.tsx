import { PropsWithChildren } from 'react'
import styles from './style.module.css'

export default function PageContainer(props: PropsWithChildren) {
  return (
    <div className={styles.container}>
      {props.children}
    </div>
  )
}
