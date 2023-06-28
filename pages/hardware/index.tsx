/* eslint-disable react-hooks/exhaustive-deps */
import { IHardwareData } from '../../types'
import { Input, Select, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import options from '@/assets/hardware/options.json'
import columns from '@/assets/hardware/columns.json'

export default function Hardware() {
  const [data, setData] = useState<IHardwareData[]>()
  const [clonedData, setClonedData] = useState<IHardwareData[]>()
  async function fetchData() {
    const res = await fetch(`/api/hardware`)
    const { data: t } = await res.json()
    setData(t)
    setClonedData(t)
  }
  useEffect(() => {
    fetchData()
  }, [])
  const [type, setType] = useState('')
  const [words, setWords] = useState('')
  useEffect(() => {
    if (!data || !clonedData) return
    const filteredData = clonedData?.filter((item: IHardwareData) => {
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
      <Space size="middle" className="mb-3">
        <Input onChange={e => setWords(e.target.value.toLowerCase())} allowClear addonBefore="器件名" placeholder="请输入器件名" />
        <Select className="w-40" onChange={val => setType(val.toLowerCase())} placeholder="选择器件类型" options={options}></Select>
      </Space>
      <Table loading={!data} rowKey="id" dataSource={data} columns={columns} />
    </div>
  )
}

