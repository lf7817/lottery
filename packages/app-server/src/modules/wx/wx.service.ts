import { Inject, Injectable } from '@nestjs/common'
import { WeChatService } from 'nest-wechat'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'

@Injectable()
export class WxService {
  constructor(
    public readonly wx: WeChatService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getStableAccessToken(): Promise<string> {
    const token = await this.cacheManager.get<string>('wx:access_token')

    if (token)
      return token

    const res = await this.wx.getStableAccessToken()

    if (res.access_token)
      await this.cacheManager.set('wx:access_token', res.access_token, 6900 * 1000)

    return res.access_token
  }

  async code2token(code: string) {
    console.log(code)
  }
}
