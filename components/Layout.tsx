import { useSession, signIn } from 'next-auth/react'
import { Empty, Button, Space } from 'antd'
import React from 'react'

export default function Layout(props: any) {
  const { data: session } = useSession()
  if (!session) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{ height: 200 }}
          description={<Space size={4}>登录时没有账号会自动注册</Space>}
        >
          <Button type="primary" onClick={() => signIn()}>
            立即登录
          </Button>
        </Empty>
      </div>
    )
  }
  return props.children
}
