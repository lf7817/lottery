import { Module } from '@nestjs/common'
import { WeChatModule } from 'nest-wechat'
import { ConfigService } from '@nestjs/config'
import { CacheModule } from '@nestjs/cache-manager'
import { WxService } from './wx.service'
import { WxController } from './wx.controller'

@Module({
  imports: [
    WeChatModule.forRootAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          appId: configService.get('WECHAT_APPID'),
          secret: configService.get('WECHAT_SECRET'),
          debug: true,
        }
      },
    }),
    CacheModule.register({ ttl: 5000 }),
  ],
  providers: [WxService],
  exports: [WxService],
  controllers: [WxController],
})
export class WxModule {}
