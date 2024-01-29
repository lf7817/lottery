export interface WxBaseResult {
  errcode: number
  errmsg: string
}

export interface WxUserinfoResult extends WxBaseResult {
  openid: string
  nickname: string
  sex: number
  province: string
  city: string
  country: string
  headimgurl: string
  privilege: string[]
  unionid: string
}

export interface WxAccessTokenResult extends WxBaseResult {
  access_token: string
  expires_in: number
  refresh_token: string
  openid: string
  scope: string
  is_snapshotuser: number
  unionid: string
}
