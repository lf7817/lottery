import { IsMobilePhone, IsNotEmpty, IsString } from 'class-validator'

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
}

export class SignInCode2TokenDto {
  @IsNotEmpty()
  @IsString()
  code: string
}
