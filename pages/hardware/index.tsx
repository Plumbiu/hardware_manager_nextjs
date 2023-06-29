/* eslint-disable react-hooks/exhaustive-deps */
import { IHardwareData } from '../../types'
import { Input, Select, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import options from '@/assets/hardware/options.json'
import columns from '@/assets/hardware/columns.json'
import Head from 'next/head'

export default function Hardware(props: { data: IHardwareData[] }) {
  const [data, setData] = useState(props.data)
  const [type, setType] = useState('')
  const [words, setWords] = useState('')
  useEffect(() => {
    const filteredData = props.data.filter((item: IHardwareData) => {
      const _name = item.name.toLowerCase()
      const _type = item.type.toLowerCase()
      if (!type) return _name.includes(words)
      if (!words) return _type.includes(type)
      return _name.includes(words) && _type.includes(type)
    })
    setData(filteredData)
  }, [type, words])

  return (
    <div>
      <Head>
        <title>硬件表格</title>
        <meta name="description" content="通过表格查看实验室的硬件信息" />
      </Head>
      <Space size="middle" className="mb-3">
        <Input
          onChange={e => setWords(e.target.value.toLowerCase())}
          allowClear
          addonBefore="器件名"
          placeholder="请输入器件名"
        />
        <Select
          className="w-40"
          onChange={val => setType(val.toLowerCase())}
          placeholder="选择器件类型"
          options={options}
        ></Select>
      </Space>
      <Table rowKey="id" dataSource={data} columns={columns} />
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/hardware`)
  const { data} = await res.json()
  return {
    props: {
      data
    }
  }
}
