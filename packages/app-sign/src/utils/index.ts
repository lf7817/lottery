export function isWechat() {
  return /microMessenger/i.test(navigator.userAgent.toLowerCase())
}
