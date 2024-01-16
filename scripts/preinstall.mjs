import { env, exit, version } from 'node:process'

if (!version.startsWith('v18')) {
  console.warn(`\u001B[33m 请使用Node.js 18.x以上版本 \u001B[39m\n`)
  exit(1)
}

if (!/pnpm/.test(env.npm_execpath || '')) {
  console.warn(`\u001B[33m 请使用pnpm安装依赖 \u001B[39m\n`)
  exit(1)
}
