export enum GameStatus {
  /** 初始欢迎状态 */
  GREETING,
  /** 游戏开始 */
  WAITING,
  /** 签到状态 */
  SIGN_IN,
  /** 游戏进行中 */
  OPENING,
  /** 抽奖中 */
  DRAWING,
  /** 游戏结束 */
  END,
  /** 颁奖模式 */
  AWARD,
}

export enum PhotoWallType {
  TABLE = 'TABLE',
  SPHERE = 'SPHERE',
  HELIX = 'HELIX',
}
