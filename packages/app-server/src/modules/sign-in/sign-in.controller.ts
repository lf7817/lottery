import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { SignInService } from './sign-in.service'
import { SignInDto } from './sign-in.dto'

@Controller('/sign-in')
export class SignInController {
  constructor(private readonly signInService: SignInService) {}

  @Post()
  async signIn(@Body() body: SignInDto) {
    return await this.signInService.signIn(body)
  }

  @Get()
  async getPeopleByActityId(@Query('id') id: string) {
    return await this.signInService.getPeopleByActityId(id)
  }
}
