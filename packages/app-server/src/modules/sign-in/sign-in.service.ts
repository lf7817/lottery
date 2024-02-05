import { Inject, Injectable } from '@nestjs/common'
import { Mutex } from 'async-mutex'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { WxService } from '../wx/wx.service'
import { HasSignInDto, SignInDto } from './sign-in.dto'

@Injectable()
export class SignInService {
  private readonly mutex = new Mutex()
  constructor(
    private readonly wxService: WxService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
  }

  async signIn(body: SignInDto) {
    return this.mutex.runExclusive(async () => {
      const map = await this.cacheManager.get<Map<string, SignInDto>>(body.activityId) ?? new Map<string, SignInDto>()
      body.mobile = body.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
      map.set(body.openid, body)
      await this.cacheManager.set(body.activityId, map, 3600 * 1000 * 24)
      return body
    })
  }

  async getPeopleByActityId(id: string) {
    const map = await this.cacheManager.get<Map<string, SignInDto>>(id) ?? new Map<string, SignInDto>()
    return [...map.values()]
  }

  async hasSignIn(body: HasSignInDto) {
    const map = await this.cacheManager.get<Map<string, SignInDto>>(body.activityId)
    if (!map)
      return false

    return map.has(body.openid)
  }
}
