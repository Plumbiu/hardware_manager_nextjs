import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import Layout from '../components/Layout'
import GithubSvg from '../components/GithubSvg'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <GithubSvg />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
