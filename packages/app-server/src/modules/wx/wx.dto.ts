import { IsNotEmpty } from 'class-validator'

export class WxCode2TokenDto {
  @IsNotEmpty()
  code: string
}
