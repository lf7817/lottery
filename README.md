# 年会抽奖

## 环境要求

```json
  {
    "node": ">=18",
    "pnpm": ">=8"
  }
```

## 安装依赖（根目录）
```bash
pnpm install
```

## 环境变量

> 没有微信公众号可以用[微信测试号](https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index),
> 使用测试号记得修改**授权回调页面域名**

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

## 运行
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

## mock

app-screen端提供了个方法，在控制台输入window.mock("活动ID", 110)即可模拟110人
点击年会签到控制台就会打印活动ID
