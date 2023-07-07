import { Avatar, Layout, Row, Col, Dropdown, MenuProps, Space } from 'antd'
import { useSession } from 'next-auth/react'
import React from 'react'
import { UserOutlined, FrownOutlined, DownOutlined } from '@ant-design/icons'
const { Header } = Layout

const menuList: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer">
        孵化器官网(暂无)
      </a>
    ),
    disabled: true,
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://hardware.plumbiu.club">
        硬件管理系统
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://github.com/Plumbiu/hardware_manager_nextjs">
        参与本项目开发
      </a>
    ),
  },
]

export default function HeaderBar() {
  const { data: session } = useSession()
  return (
    <Header className="pl-3 corner:pr-20 pr-3" style={{ background: '#fff' }}>
      <Row justify="space-between">
        <Col>
          {session ? (
            <Space size={8}>
              <Avatar size={45} src={session.user.image} icon={<UserOutlined />} />
              {session.user.name}
            </Space>
          ) : (
            <Avatar size={45} icon={<FrownOutlined />} />
          )}
        </Col>
        <Col>
          <Dropdown menu={{ items: menuList }}>
            <a onClick={e => e.preventDefault()}>
              <Space>
                参加更多
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Col>
      </Row>
    </Header>
  )
}
