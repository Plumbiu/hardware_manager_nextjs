import { IUserData } from '../../types'
import { rolesArr, tagColorArr } from '../../composables/userRole'
import { Button, Table, Tag, Modal, Select, Empty } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { encrypt } from '../../utils/useCrypt'
import Head from 'next/head'

export default function User() {
  const [data, setData] = useState<IUserData[]>()
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/user`)
      const { data: t } = await res.json()
      setData(t)
    }
    fetchData()
  }, [])
  const { data: session } = useSession()
  const [id, setId] = useState('')
  const [role, setRole] = useState(session?.role)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  console.log(session)

  async function handleOk() {
    try {
      await fetch('/api/user/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          role,
          secret: encrypt(process.env.NEXT_PUBLIC_API_SECRET!),
        }),
      })
    } catch (err) {
    } finally {
      setIsModalOpen(false)
      setConfirmLoading(false)
    }
  }

  if (!session || session?.role === 2) {
    return <Empty description={<span className="text-black/50">普通成员无权限查看，请联系管理员</span>} />
  }

  return (
    <>
      <Head>
        <title>用户管理</title>
        <meta name="description" content="用于管理用户的权限" />
      </Head>
      <Table loading={!data} rowKey="id" dataSource={data}>
        <Table.Column title="名称" dataIndex="name" key="name" />
        <Table.Column title="邮箱" dataIndex="email" key="email" />
        <Table.Column
          title="权限"
          dataIndex="role"
          key="role"
          render={(role: number) => <Tag color={tagColorArr[role]}>{rolesArr[role]}</Tag>}
        />
        <Table.Column
          title="操作"
          dataIndex="id"
          key="operator"
          render={(id: string) => (
            <Button
              onClick={() => {
                setIsModalOpen(true)
                setId(id)
              }}
            >
              设置
            </Button>
          )}
        />
      </Table>
      <Modal
        title={`修改权限`}
        open={isModalOpen}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={() => setIsModalOpen(false)}
        okText="确认"
        cancelText="取消"
      >
        <Select
          defaultValue={role}
          style={{ width: 120 }}
          onChange={(val: number) => setRole(val)}
          options={[
            { value: 0, label: '超级管理员', disabled: role! > 0 },
            { value: 1, label: '管理员', disabled: role! > 1 },
            { value: 2, label: '普通成员', disabled: role! > 2 },
          ]}
        />
      </Modal>
    </>
  )
}
