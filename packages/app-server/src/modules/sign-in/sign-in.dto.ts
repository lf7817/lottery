import { IsMobilePhone, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  username: string

  @IsNotEmpty()
  @IsMobilePhone('zh-CN')
  mobile: string

  @IsNotEmpty()
  @IsString()
  activityId: string

  @IsNotEmpty()
  @IsString()
  openid: string

  @IsOptional()
  @IsString()
  headimgurl?: string
}

export class HasSignInDto {
  @IsNotEmpty()
  @IsString()
  activityId: string

  @IsNotEmpty()
  @IsString()
  openid: string
}
