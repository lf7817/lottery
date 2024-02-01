import { MResponse } from '@lottery/shared/types'
import * as mockjs from 'mockjs'
import { Person } from '@/types'
import { gameOneAction } from '@/pages/GameOne/store/action.ts'

export async function fetchUserList(id?: string) {
  if (!id)
    return []

  try {
    const res = await fetch(`/lottery-api/sign-in?id=${id}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data: MResponse<Person[]> = await res.json()

    if (data.code === 0 && data.data) {
      gameOneAction.updatePeople(data.data)
      return data.data
    }
  } catch (error) {
    console.log(error)
  }
}

async function fetchSignin(data: any) {
  return fetch(`/lottery-api/sign-in`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

function test(id: string, len: number) {
  return Array.from({ length: len }).fill(1).map((_, index) => {
    return fetchSignin({
      username: mockjs.mock('@cname'),
      mobile: `138${index.toString().padStart(8, '0')}`,
      activityId: id,
      openid: index.toString(),
      headimgurl: mockjs.Random.image('200x200', mockjs.Random.color()),
    })
  })
}

// @ts-expect-error
window.mock = test
