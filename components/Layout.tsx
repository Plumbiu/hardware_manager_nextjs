import { useSession, signIn } from 'next-auth/react'
import React, { Suspense } from 'react'
import { Layout as AntdLayout, Breadcrumb } from 'antd'
import { useRouter } from 'next/router'
import Loading from '@/components/Loading'
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
    () => signIn()
  } else {
    return (
      <Suspense fallback={<Loading />}>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: '硬件管理系统' }, { title: pathname }]} />
          <div style={{ overflow: 'auto', padding: 12, minHeight: 360, background: '#fff' }}>{props.children}</div>
        </Content>
      </Suspense>
    )
  }
}
