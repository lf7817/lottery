import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  constructor() {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()
    const status
      = exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR
    let message = exception.message
    let code = 1000
    let errors

    try {
      const res = exception.getResponse()

      if (typeof res === 'object') {
        message = (res as any).message
        code = (res as any).code || 1000
        errors = (res as any).errors || {}
      } else if (typeof res === 'string') {
        const resObj = JSON.parse(res)
        message = resObj.message
        code = resObj.code || 1000
        errors = resObj.errors || {}
      }
    } catch (e) {}

    const errorResponse = {
      status,
      message,
      code,
      path: request.url,
      method: request.method,
      errors,
      timestamp: new Date().toLocaleDateString(),
    }

    Logger.error({
      message: [exception.message, exception.stack].join('\n'),
    })
    Logger.error({
      message: `${request.method} ${request.url} \n error: ${JSON.stringify(
        errorResponse,
      )}`,
    })

    // 设置返回的状态码、请求头、发送错误信息
    response
      .status(HttpStatus.OK)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(errorResponse)
  }
}
