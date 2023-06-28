import { Avatar, Button, Input, List, Modal, Space, Tag } from 'antd'
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons'
import { rolesArr, tagColorArr } from '../../composables/userRole'
import React, { useEffect, useState } from 'react'
import { ICommentData } from '../../types'
import { useSession } from 'next-auth/react'
import { encrypt } from '../../utils/useCrypt'

const IconText = ({ icon, text }: { icon: any; text: string }) => (
  <Space className="cursor-pointer hover:text-blue-500 transition-colors">
    {icon}
    {text}
  </Space>
)

export default function Comment() {
  const [data, setData] = useState<ICommentData[]>()
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/comment`)
      const { data: t } = await res.json()
      setData(t)
    }
    fetchData()
  }, [])
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const { data: session } = useSession()
  async function handleOk() {
    try {
      await fetch('/api/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: session?.user.id,
          text,
          secret: encrypt(process.env.NEXT_PUBLIC_API_SECRET!),
        }),
      })
    } catch (err) {
    } finally {
      setOpen(false)
    }
  }
  return (
    <>
      <Button.Group className="mb-3">
        <Button onClick={() => setOpen(true)} type="primary">
          添加评论
        </Button>
      </Button.Group>
      <List
        bordered
        itemLayout="vertical"
        dataSource={data}
        rowKey="id"
        renderItem={item => (
          <List.Item
            actions={[
              <IconText icon={<DislikeOutlined />} text={`${item.like}`} key="list-vertical-star-o" />,
              <IconText icon={<LikeOutlined />} text={`${item.disLike}`} key="list-vertical-like-o" />,
              <IconText icon={<LikeOutlined />} text={item.finished ? 'x' : '√'} key="list-vertical-like-o" />,
            ]}
            extra={
              <Button disabled={item.user.role === 2} type="primary">
                标记完成
              </Button>
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.user.image} />}
              title={
                <Space size={4}>
                  <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{item.user.name}</span>
                  <Tag color={tagColorArr[item.user.role]}>{rolesArr[item.user.role]}</Tag>
                </Space>
              }
              description={item.user.email}
            />
            {item.text}
          </List.Item>
        )}
      />
      <Modal
        title={`添加评论`}
        open={open}
        onOk={handleOk}
        onCancel={() => setOpen(false)}
        okText="确认"
        cancelText="取消"
      >
        <Input placeholder="请输入评论内容" onChange={e => setText(e.target.value)} />
      </Modal>
    </>
  )
}
