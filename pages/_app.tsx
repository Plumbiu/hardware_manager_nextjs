import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import Layout from '../components/Layout'
import GithubSvg from '../components/GithubSvg'
import HeaderBar from '../components/HeaderBar'
import { SiderBar } from '../components/SiderBar'
import { Layout as AntdLayout } from 'antd'
import FooterBtn from '../components/FooterBtn'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <GithubSvg />
      <AntdLayout style={{ minHeight: '100vh' }}>
        <SiderBar />
        <AntdLayout>
          <HeaderBar />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AntdLayout>
      </AntdLayout>
      <FooterBtn />
    </SessionProvider>
  )
}
