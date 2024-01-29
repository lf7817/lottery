import { Controller } from '@nestjs/common'
import { SignInService } from './sign-in.service'

@Controller('/sign-in')
export class SignInController {
  constructor(private readonly signInService: SignInService) {}
}
