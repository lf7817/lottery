import { join } from 'node:path'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CacheModule } from '@nestjs/cache-manager'
import { ServeStaticModule } from '@nestjs/serve-static'
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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../app-sign/dist'),
      serveRoot: '/sign',
      serveStaticOptions: {
        index: false,
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../app-screen/dist'),
      serveRoot: '/screen',
      serveStaticOptions: {
        index: false,
      },
    }),
    WxModule,
    SignInModule,
  ],
})
export class AppModule {}
