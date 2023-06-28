import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { decrypt } from '../../utils/useCrypt'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const users = await prisma.user.findMany()
      res.status(200).json({
        code: 2000,
        data: users,
        message: '获取用户成功!',
      })
    } else if (req.method === 'PUT') {
      const { id, role, secret } = req.body
      if (decrypt(secret) !== process.env.NEXT_PUBLIC_API_SECRET) throw new Error('想要爆破接口？门都没有！')
      if (!id || role == undefined) throw new Error('参数不正确')
      await prisma.user.update({
        where: {
          id,
        },
        data: {
          role,
        },
      })
      res.status(200).json({
        code: 2000,
        message: '更新用户成功!',
      })
    }
  } catch (err: any) {
    res.status(200).json({
      code: 4000,
      message: err.message,
    })
  }
}
