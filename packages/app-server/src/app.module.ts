import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CacheModule } from '@nestjs/cache-manager'
import configs from './configs/config'
import { SignInModule } from './modules/sign-in/sign-in.module'
import { WxModule } from './modules/wx/wx.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configs],
      expandVariables: true,
      envFilePath: ['.env.local'],
    }),
    CacheModule.register({ ttl: 5000, isGlobal: true }),
    WxModule,
    SignInModule,
  ],
})
export class AppModule {}
