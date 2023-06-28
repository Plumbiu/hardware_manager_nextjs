import { FloatButton } from 'antd'
import { LoginOutlined, } from '@ant-design/icons'
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function FooterBtn() {
  const { data: session } = useSession()
  return (
    <FloatButton
      icon={session ? <LoginOutlined /> : <LoginOutlined />}
      tooltip={session ? '退出登陆' : '登录'}
      onClick={session ? () => signOut() : () => signIn()}
    />
  )
}
