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
        title: '华为MatePad 11',
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
        id: '3_0',
        title: '小熊料理锅',
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
        id: '4_0',
        title: '九阳破壁机',
        total: 3,
        image: mockjs.Random.image('200x200'),
      },
    ],
  },
  {
    id: '4',
    title: '幸运奖',
    count: 1,
    prize: [
      {
        id: '5_0',
        title: '颈椎按摩仪',
        total: 10,
        image: mockjs.Random.image('200x200'),
      },
      {
        id: '5_1',
        title: '移动电源',
        total: 10,
        image: mockjs.Random.image('200x200'),
      },
      {
        id: '5_2',
        title: '电热水杯',
        total: 10,
        image: mockjs.Random.image('200x200'),
      },
    ],
  },
]
