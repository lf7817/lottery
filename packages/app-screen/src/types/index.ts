export interface Prize {
  id: string
  title: string
  total: number
}

export interface Award {
  id: string
  title: string
  prize: Prize[]
}

export interface Person {
  username: string
  mobile: string
  openid: string
  headimgurl: string
}
