import { Menu, Layout } from 'antd'
const { Sider } = Layout
import router from 'next/router'
import type { MenuProps } from 'antd'
import React from 'react'
type MenuItem = Required<MenuProps>['items'][number]
import {
  PlusCircleOutlined,
  MessageOutlined,
  DesktopOutlined,
  UserOutlined,
  MenuOutlined,
} from '@ant-design/icons'
function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}

const items: MenuItem[] = [
  getItem('用户管理', 'user', <UserOutlined />),
  getItem('评论系统', 'comment', <MessageOutlined />),
  getItem('硬件表格', 'hardware', <DesktopOutlined />),
  getItem('未来功能', 'future', <MenuOutlined />, [
    getItem('批量导入', 'import', <PlusCircleOutlined />),
  ]),
]
export const SiderBar = () => {
  return (
    <Sider breakpoint="xl">
      <div className="m-4 p-3 bg-white/10 rounded-xl text-white/80 font-bold text-sm text-center">硬件管理系统</div>
      <Menu
        onClick={({ key }) => router.push(key)}
        theme="dark"
        defaultSelectedKeys={['1']}
        mode="inline"
        items={items}
      />
    </Sider>
  )
}
