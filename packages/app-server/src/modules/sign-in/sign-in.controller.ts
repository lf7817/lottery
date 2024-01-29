import { Body, Controller, Post } from '@nestjs/common'
import { SignInService } from './sign-in.service'
import { SignInDto } from './sign-in.dto'

@Controller('/sign-in')
export class SignInController {
  constructor(private readonly signInService: SignInService) {}

  @Post()
  async signIn(@Body() body: SignInDto) {
    return await this.signInService.signIn(body)
  }
}
