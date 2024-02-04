export type Writable<T> = {
  -readonly [key in keyof T]: T[key]
}

export interface Prize {
  id: string
  title: string
  total: number
  image: string
  /** 剩余奖品个数 */
  remain?: number
  desc: string
}

export interface Award {
  id: string
  title: string
  /** 一次抽多少个 */
  count: number
  /** 一个奖项里可以有多个商品 */
  prize: Prize[]
  
}

export interface Person {
  username: string
  mobile: string
  openid: string
  headimgurl: string
  /** 奖项 ID */
  awardId?: string
  /** 奖品 ID */
  prizeId?: string
}
