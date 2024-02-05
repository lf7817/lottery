import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { SignInService } from './sign-in.service'
import { HasSignInDto, SignInDto } from './sign-in.dto'

@Controller('/sign-in')
export class SignInController {
  constructor(private readonly signInService: SignInService) {}

  @Post()
  async signIn(@Body() body: SignInDto) {
    return this.signInService.signIn(body)
  }

  @Get()
  async getPeopleByActityId(@Query('id') id: string) {
    return this.signInService.getPeopleByActityId(id)
  }

  @Post('hasSignIn')
  async hasSignIn(@Body() body: HasSignInDto) {
    return this.signInService.hasSignIn(body)
  }
}
