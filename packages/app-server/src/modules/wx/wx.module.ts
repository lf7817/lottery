import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { WxService } from './wx.service'
import { WxController } from './wx.controller'

@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  ],
  providers: [WxService],
  exports: [WxService],
  controllers: [WxController],
})
export class WxModule {}
