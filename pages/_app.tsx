import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import React, { Suspense } from 'react'
import { Layout as AntdLayout, theme, Breadcrumb } from 'antd'
import { useRouter } from 'next/router'
import { SiderBar } from '../components/SiderBar'
import HeaderBar from '../components/HeaderBar'
import FooterBtn from '../components/FooterBtn'
import Layout from '../components/Layout'
import GithubSvg from '../components/GithubSvg'
import Loading from '@/components/Loading'

const { Content } = AntdLayout

interface IRouteMap {
  [key: string]: string
}
const routeMap: IRouteMap = {
  user: '用户管理',
  comment: '评论系统',
  hardware: '硬件表格',
  future: '未来功能',
}
const MemoSiderBar = React.memo(SiderBar)
const MemoHeaderBar = React.memo(HeaderBar)

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const router = useRouter()
  const pathname = routeMap[router.pathname.replace('/', '')]
  return (
    <SessionProvider session={session}>
      <GithubSvg />
      <Layout colorBgContaine={colorBgContainer}>
        <AntdLayout style={{ minHeight: '100vh' }}>
          <MemoSiderBar />
          <AntdLayout>
            <MemoHeaderBar colorBgContainer={colorBgContainer} />
            <Suspense fallback={<Loading />}>
              <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: '硬件管理系统' }, { title: pathname }]} />
                <div style={{ overflow: 'auto', padding: 12, minHeight: 360, background: colorBgContainer }}>
                  <Component {...pageProps} />
                </div>
              </Content>
            </Suspense>
          </AntdLayout>
        </AntdLayout>
        <FooterBtn />
      </Layout>
    </SessionProvider>
  )
}
