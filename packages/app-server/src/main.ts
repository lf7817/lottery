import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { HttpStatus, ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './common/filters/http-exception.filter'
import { TransformInterceptor } from './common/interceptors/transform.interceptor'
import { CommonException, HttpResCode } from './common/exceptions/common.exception'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)

  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    exceptionFactory: errors =>
      new CommonException(
        HttpResCode.DTO_VALIDATE_ERR,
        HttpStatus.OK,
        errors,
      ),
  }))

  if (configService.get('cors'))
    app.enableCors()

  await app.listen(configService.get('port'))
}
bootstrap()
