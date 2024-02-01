import * as mockjs from 'mockjs'
import { Award } from '@/types'

export const awards: Award[] = [
  {
    id: '0',
    title: '特等奖',
    count: 1,
    prize: [
      {
        id: '0_0',
        title: '华为HUAWEI MatePad 11 2023款',
        total: 1,
        image: mockjs.Random.image('200x200'),
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
        title: '华为手表',
        total: 1,
        image: mockjs.Random.image('200x200'),
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
        image: mockjs.Random.image('200x200'),
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
        image: mockjs.Random.image('200x200'),
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
        title: '颈椎按摩仪',
        total: 10,
        image: mockjs.Random.image('200x200'),
      },
      {
        id: '4_1',
        title: '移动电源',
        total: 10,
        image: mockjs.Random.image('200x200'),
      },
      {
        id: '4_2',
        title: '电热水杯',
        total: 10,
        image: mockjs.Random.image('200x200'),
      },
    ],
  },
]
