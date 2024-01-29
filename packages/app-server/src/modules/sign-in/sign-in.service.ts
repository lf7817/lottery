import { Injectable } from '@nestjs/common'
import { WxService } from '../wx/wx.service'
import { SignInDto } from './sign-in.dto'

@Injectable()
export class SignInService {
  constructor(private readonly wxService: WxService) {}

  async signIn(body: SignInDto) {
    console.log(body)
  }
}
