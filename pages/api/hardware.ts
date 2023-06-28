import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const hardware = await prisma.hardware.findMany()
      res.status(200).json({
        code: 2000,
        data: hardware,
        message: '获取数据成功!',
      })
    } catch (err) {
      res.status(200).json({
        code: 4000,
        message: '获取数据失败!',
      })
    }
  }
}
