import { Body, Controller, Post } from '@nestjs/common'
import { WxService } from '../wx/wx.service'
import { SignInService } from './sign-in.service'
import { SignInCode2TokenDto } from './sign-in.dto'

@Controller('/sign-in')
export class SignInController {
  constructor(private readonly signInService: SignInService, private readonly wxSerivce: WxService) {}

  @Post('code2token')
  async code2token(@Body() data: SignInCode2TokenDto) {
    return this.wxSerivce.wx.getAccessTokenByCode(data.code)
  }
}
