import { FloatButton } from 'antd'
import { LoginOutlined, } from '@ant-design/icons'
import React from 'react'
import { signOut } from 'next-auth/react'

export default function FooterBtn() {
  return (
    <FloatButton
      icon={<LoginOutlined />}
      tooltip='退出登陆'
      onClick={() => signOut()}
    />
  )
}
