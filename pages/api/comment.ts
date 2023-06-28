import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { decrypt } from '../..//utils/useCrypt'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const comments = await prisma.comment.findMany({
        include: {
          user: true,
        },
      })
      res.status(200).json({
        code: 2000,
        data: comments,
        message: '获取评论成功!',
      })
    } else if (req.method === 'POST') {
      const { id, text, secret } = req.body
      if (!id || !text) throw new Error('参数错误!')
      if (decrypt(secret) !== process.env.NEXT_PUBLIC_API_SECRET) throw new Error('想要爆破接口？门都没有！')
      await prisma.comment.create({
        data: {
          userId: id,
          text,
        },
      })
    }
  } catch (err: any) {
    res.status(200).json({
      code: 4000,
      message: err.message,
    })
  }
}
