# 年会抽奖

- 采用 threejs搭建整个场景（react-three-fiber）
- 支持微信扫码签到
- 数据持久化，支持页面刷新

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
VITE_API_HOST = '/lottery/lottery-api'
```

*app-sign*目录下新建``.env.production``指定生产端环境变量
```bash
# 微信公众号 APPID, 用于微信授权登录
VITE_WECHAT_APPID = xxxx
VITE_API_HOST = '/lottery/lottery-api'
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

## QA

### 如何制作精灵动画，比如这个项目里的灯笼、龙？
1. 到资源网（比如千库网）上找你想要的动画视频，下带 AE模板的
2. 使用 AE导出 png 序列
3. 根据情况压缩下图片质量，我这里用的图压，导出 webp的格式更小还支持透明通道
4. 然后使用[texturepacker](https://www.codeandweb.com/texturepacker)制作精灵，导出json和图片

## 感谢
- https://threejs.org/examples/?q=periodictable#css3d_periodictable
- https://github.com/moshang-xc/lottery
- https://github.com/GAtomis/lottery-web
