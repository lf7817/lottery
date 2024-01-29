import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { HttpService } from '@nestjs/axios'
import { AxiosResponse } from 'axios'
import { WechatException } from '../../common/exceptions/wechat.exception'
import { WxAccessTokenResult, WxUserinfoResult } from './wx.interface'

@Injectable()
export class WxService {
  constructor(
    public readonly config: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  private get appId() {
    return this.config.get<string>('WECHAT_APPID')
  }

  private get secret() {
    return this.config.get<string>('WECHAT_SECRET')
  }

  public async wxGetUserinfo(openId: string, accessToken: string): Promise<AxiosResponse<WxUserinfoResult>> {
    const url = `https://api.weixin.qq.com/sns/userinfo?access_token=${accessToken}&openid=${openId}&lang=zh_CN`
    return this.httpService.axiosRef.get<WxUserinfoResult>(url)
  }

  public async wxGetAccessTokenByCode(code: string): Promise<AxiosResponse<WxAccessTokenResult>> {
    const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${this.appId}&secret=${this.secret}&code=${code}&grant_type=authorization_code`
    return this.httpService.axiosRef.get<WxAccessTokenResult>(url)
  }

  public async getUserInfo(code) {
    const res = await this.wxGetAccessTokenByCode(code)

    if (!res.data.errcode) {
      const userinfo = await this.wxGetUserinfo(res.data.openid, res.data.access_token)

      if (!userinfo.data.errcode)
        return userinfo.data

      throw new WechatException(userinfo.data.errcode, userinfo.data.errmsg)
    }

    throw new WechatException(res.data.errcode, res.data.errmsg)
  }
}
