import NextAuth, { NextAuthOptions } from 'next-auth'
import { NextApiHandler } from 'next'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import CredentialsProvider from 'next-auth/providers/credentials'
import { encrypt } from '../../../utils/useCrypt'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        invitedCode: { label: 'INVITEDCODE', type: 'text', placeholder: '邀请码(已注册可不用填写)' },
        name: { label: 'NAME', type: 'text', placeholder: '用户名' },
        email: { label: 'EMAIL', type: 'text', placeholder: '邮箱' },
        password: { label: 'PASSWORD', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials || !credentials.email || !credentials.name || !credentials.password.trim())
            throw new Error('获取失败，请填写有效信息')
          const user = await prisma.user.findFirst({
            where: {
              email: credentials.email,
              name: credentials.name,
              password: encrypt(credentials.password),
            },
          })
          if (!user) {
            if (credentials?.invitedCode !== process.env.INVITED_CODE) throw new Error('邀请码错误')
            const newUser = await prisma.user.create({
              data: {
                email: credentials.email,
                name: credentials.name,
                password: encrypt(credentials.password),
              },
            })
            return newUser
          }
          return user
        } catch (error: any) {
          console.log(error.message);
          
          return null
        }
      },
    }),
    // TODO: 其他登录方式
    // GithubProvider({
    //   clientId: process.env['NEXT_PUBLIC_GITHUB_ID']!,
    //   clientSecret: process.env['NEXT_PUBLIC_GITHUB_SECRET']!,
    //   httpOptions: {
    //     timeout: 500000,
    //   },
    // }),
    // EmailProvider({
    //   // server: {
    //   //   host: process.env.EMAIL_HOST,
    //   //   port: process.env.EMAIL_PORT,
    //   //   auth: {
    //   //     user: process.env.EMAIL_USERNAME,
    //   //     pass: process.env.EMAIL_USERNAME
    //   //   }
    //   // },
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    //   maxAge: 24 * 60 * 60 * 30, // 设置邮箱链接失效时间，默认24小时
    // }),
  ],
  // debug: true,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXT_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    session: async ({ session, token }) => {
      try {
        if (session?.user && token) {
          session.user.id = token.id as string
          const findUser = await prisma.user.findUnique({
            where: {
              id: session.user.id,
            },
          })
          if (!findUser) throw new Error('用户不存在')
          return { ...session, role: findUser.role }
        }
        throw new Error('session 不存在')
      } catch (err) {
        return session
      }
    },
  },
}

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions)
export default authHandler
