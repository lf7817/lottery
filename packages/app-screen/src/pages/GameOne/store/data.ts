import { Award } from '@/types'
import { AssetPaths } from '@/pages/GameOne/config.ts'

export const awards: Award[] = [
  {
    id: '0',
    title: '特等奖',
    count: 1,
    prize: [
      {
        id: '0_0',
        title: '华为HUAWEI MatePad',
        total: 1,
        image: AssetPaths.awardPad,
        desc: 'MatePad 11 2023款 8+128G',
      },
    ],
  },
  {
    id: '1',
    title: '一等奖',
    count: 1,
    prize: [
      {
        id: '1_0',
        title: '华为手表GT3',
        total: 1,
        image: AssetPaths.awardWatch,
        desc: '46mm,血氧自动检测、体温检测',
      },
    ],
  },
  {
    id: '2',
    title: '二等奖',
    count: 1,
    prize: [
      {
        id: '2_0',
        title: '小熊（Bear）折叠多功能料理锅',
        total: 2,
        image: AssetPaths.awardGuo,
        desc: '烤涮两用、升级折叠',
      },
    ],
  },
  {
    id: '3',
    title: '三等奖',
    count: 1,
    prize: [
      {
        id: '3_0',
        title: '九阳（Joyoung）破壁机',
        total: 3,
        image: AssetPaths.awardJi,
        desc: '1.75L大容量 降噪、预约加热',
      },
    ],
  },
  {
    id: '4',
    title: '幸运奖',
    count: 10,
    prize: [
      {
        id: '4_0',
        title: '移动电源',
        total: 10,
        image: AssetPaths.awardCdb,
        desc: '10000毫安大容量，轻薄便携',
      },
      {
        id: '4_1',
        title: '电热水杯',
        total: 10,
        image: AssetPaths.awardCup,
        desc: '350ml一键烧水',
      },
      {
        id: '4_2',
        title: '颈椎按摩仪',
        total: 10,
        image: AssetPaths.awardAmy,
        desc: '18档脉冲+智能语音提示',
      },
    ],
  },
]

// export const sound1 = new Howl({
//   src: [audio1],
//   autoplay: true,
//   loop: true,
//   volume: 0.5,
// })
//
// export const sound2 = new Howl({
//   src: [audio2],
//   autoplay: true,
//   loop: true,
//   volume: 0.5,
// })
// export const sound3 = new Howl({
//   src: [audio3],
//   autoplay: true,
//   loop: true,
//   volume: 0.5,
// })
//
// export const sound = [sound1, sound2, sound3]
