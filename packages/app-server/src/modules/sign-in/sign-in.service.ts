import { Injectable } from '@nestjs/common'
import { WxService } from '../wx/wx.service'

@Injectable()
export class SignInService {
  constructor(private readonly wxService: WxService) {}

  async signIn() {
    const token = await this.wxService.getStableAccessToken()
    return token
  }
}
