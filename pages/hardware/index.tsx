/* eslint-disable react-hooks/exhaustive-deps */
import { IHardwareData } from '../../types'
import { Input, Select, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'

const columns = [
  {
    title: '位置',
    dataIndex: 'box_num',
  },
  {
    title: '器件名',
    dataIndex: 'name',
  },
  {
    title: '类型',
    dataIndex: 'type',
  },
  {
    title: '位置(行)',
    dataIndex: 'row',
  },
  {
    title: '位置(列)',
    dataIndex: 'col',
  },
]
const options = [
  { value: '', label: '全部' },
  { value: 'IC', label: 'IC' },
  { value: '5A', label: '5A' },
  { value: '钽电容', label: '钽电容' },
  { value: '电解电容', label: '电解电容' },
  { value: '接口', label: '接口' },
  { value: '晶振', label: '晶振' },
  { value: '1117', label: '1117' },
  { value: 'CAP', label: 'CAP' },
  { value: 'FET', label: 'FET' },
  { value: 'IND', label: 'IND' },
  { value: 'LED', label: 'LED' },
  { value: 'MOS管', label: 'MOS管' },
  { value: 'NPN', label: 'NPN' },
  { value: 'PNP', label: 'PNP' },
  { value: 'RES', label: 'RES' },
  { value: 'SNAP', label: 'SNAP' },
  { value: 'TF卡座', label: 'TF卡座' },
  { value: 'USB', label: 'USB' },
  { value: 'XTAL', label: 'XTAL' },
  { value: '按钮', label: '按钮' },
  { value: '保险丝', label: '保险丝' },
  { value: '插头', label: '插头' },
  { value: '插座', label: '插座' },
  { value: '传感器', label: '传感器' },
  { value: '串口通信模块', label: '串口通信模块' },
  { value: '磁铁', label: '磁铁' },
  { value: '磁珠', label: '磁珠' },
  { value: '底座', label: '底座' },
  { value: '电感', label: '电感' },
  { value: '电机', label: '电机' },
  { value: '电容', label: '电容' },
  { value: '电位器', label: '电位器' },
  { value: '电阻', label: '电阻' },
  { value: '垫圈', label: '垫圈' },
  { value: '顶针', label: '顶针' },
  { value: '端子', label: '端子' },
  { value: '舵机', label: '舵机' },
  { value: '耳机插座', label: '耳机插座' },
  { value: '二极管', label: '二极管' },
  { value: '干电池', label: '干电池' },
  { value: '基本元器件', label: '基本元器件' },
  { value: '继电器', label: '继电器' },
  { value: '接口', label: '接口' },
  { value: '接头', label: '接头' },
  { value: '接线柱', label: '接线柱' },
  { value: '镜头', label: '镜头' },
  { value: '卡座', label: '卡座' },
  { value: '开关', label: '开关' },
  { value: '密封圈', label: '密封圈' },
  { value: '模块', label: '模块' },
  { value: '排母', label: '排母' },
  { value: '排针', label: '排针' },
  { value: '三极管', label: '三极管' },
  { value: '摄像头', label: '摄像头' },
  { value: '弯折铝管', label: '弯折铝管' },
  { value: '无线仿真器', label: '无线仿真器' },
  { value: '扬声器', label: '扬声器' },
  { value: '语音合成模块', label: '语音合成模块' },
  { value: '直插式电解电容', label: '直插式电解电容' },
  { value: '直插式铝电解电容', label: '直插式铝电解电容' },
  { value: '钻头', label: '钻头' },
]
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
  function filterByType(payload: any) {
    const val = payload.toLowerCase()
    setType(val)
  }
  function filterByWords(payload: any) {
    const val = payload.target.value.toLowerCase()
    setWords(val)
  }
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
        <Input onChange={filterByWords} allowClear addonBefore="器件名" placeholder="请输入器件名" />
        <Select className="w-40" onChange={filterByType} placeholder="选择器件类型" options={options}></Select>
      </Space>
      <Table rowKey="id" dataSource={data} columns={columns} />
    </div>
  )
}
