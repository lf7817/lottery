import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { instanceToPlain } from 'class-transformer'

export interface Response<T> {
  data: T
}

@Injectable()
export class TransformInterceptor<T>
implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          code: 0,
          message: '请求成功',
          data: instanceToPlain(data) as T,
        }
      }),
    )
  }
}
