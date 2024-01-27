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

interface PersonAward {

}

export interface Person {
  name: string
  mobile: string
  openId?: string
  avatar?: string
  award?: PersonAward
}
