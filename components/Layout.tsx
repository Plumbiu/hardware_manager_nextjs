import { useSession, signIn } from 'next-auth/react'
import React from 'react'
import { Layout as AntdLayout, Breadcrumb, Button, Modal, Result } from 'antd'
import { useRouter } from 'next/router'
import Login from './Login'
interface IRouteMap {
  [key: string]: string
}
const routeMap: IRouteMap = {
  user: '用户管理',
  comment: '评论系统',
  hardware: '硬件表格',
  future: '未来功能',
}
const { Content } = AntdLayout

export default function Layout(props: any) {
  const { data: session } = useSession()
  const router = useRouter()
  const pathname = routeMap[router.pathname.replace('/', '')]
  if (!session) {
    return <Login />
  }
  return (
    <Content style={{ margin: '0 16px' }}>
      <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: '硬件管理系统' }, { title: pathname }]} />
      <div style={{ overflow: 'auto', padding: 12, minHeight: 360, background: '#fff' }}>{props.children}</div>
    </Content>
  )
}
