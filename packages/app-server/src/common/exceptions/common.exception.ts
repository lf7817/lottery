/*
 * @Author: 李凡
 * @Email: 535536456@qq.com
 * @Date: 2020-12-08 23:44:22
 * @LastEditors: 李凡
 * @LastEditTime: 2021-03-02 16:23:03
 * @Description:
 */
import { HttpException, HttpStatus, ValidationError } from '@nestjs/common'

interface ResCode {
  code: number
  message: string
}

export const HttpResCode = {
  DTO_VALIDATE_ERR: { code: 10000, message: '参数传递错误' },
}

export class CommonException extends HttpException {
  constructor(
    private resCode: ResCode,
    private httpStatus?: number,
    private errors?: ValidationError[] | string | string[],
  ) {
    super({ ...resCode, errors }, httpStatus || HttpStatus.OK)
  }
}
