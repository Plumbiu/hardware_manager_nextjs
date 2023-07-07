import { Button, Result } from 'antd'
import { signIn } from 'next-auth/react'
import React from 'react'

function Login() {
  return (
    <Result
      className="absolute left-0 right-0 top-0 bottom-0 flex flex-col items-center justify-center bg-slate-200"
      status="error"
      title="你需要登录才能查看"
      extra={
        <Button type="primary" key="signIn" onClick={() => signIn()}>
          立即登录
        </Button>
      }
    />
  )
}

export default Login
