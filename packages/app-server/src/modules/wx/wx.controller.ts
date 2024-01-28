import { Controller, Get, Query } from '@nestjs/common'
import { WxService } from './wx.service'
import { WxCode2TokenDto } from './wx.dto'

@Controller('/wx')
export class WxController {
  constructor(private readonly wxService: WxService) {}

  @Get('code2token')
  async code2token(@Query() query: WxCode2TokenDto) {
    return this.wxService.code2token(query.code)
  }
}
