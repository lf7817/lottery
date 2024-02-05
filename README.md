# 年会抽奖

环境要求

```json
  {
    "node": ">=18",
    "pnpm": ">=8"
  }
```

安装依赖（根目录）
```bash
pnpm install
```

环境变量

*app-server*目录下新建 ``.env.local``
```
# 微信公众号 APPID 和 SECRET
WECHAT_APPID = xxxx
WECHAT_SECRET = xxxxxx
```

*app-screen*目录下新建 ``.env.production``指定生产端环境变量
```
# 签到端地址
VITE_HOST = '替换成你的域名或 IP'
```

*app-sign*目录下新建``.env.production``指定生产端环境变量
```bash
# 微信公众号 APPID, 用于微信授权登录
VITE_WECHAT_APPID = xxxx
```

运行
```bash
pnpm run build
pnpm run start
```

地址
```
# 抽奖端
http://localhost:4000/screen/
# 签到端
http://localhost:4000/sign/
```
