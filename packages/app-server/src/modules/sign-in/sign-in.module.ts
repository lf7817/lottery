import { Module } from '@nestjs/common'
import { WxModule } from '../wx/wx.module'
import { SignInService } from './sign-in.service'
import { SignInController } from './sign-in.controller'

@Module({
  imports: [WxModule],
  providers: [SignInService],
  controllers: [SignInController],
})
export class SignInModule {}
