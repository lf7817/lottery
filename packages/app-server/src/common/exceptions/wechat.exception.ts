import { HttpException, HttpStatus } from '@nestjs/common'
import { HttpResCode } from './common.exception'

export class WechatException extends HttpException {
  constructor(private errcode: number, private errmsg: string) {
    super({ ...HttpResCode.WECHAT_API_ERR, errors: { errcode, errmsg } }, HttpStatus.OK)
  }
}
