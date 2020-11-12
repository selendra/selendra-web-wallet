import React, { useEffect, useState } from 'react';
import '../styles/Transaction.css';
import { Tag, Space, Table, Spin } from 'antd'
import AxiosInstance from '../helpers/AxiosInstance';
import { LoadingOutlined } from '@ant-design/icons';


function Transaction() {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const columns = [
    {
      title: 'Asset',
      dataIndex: 'name',
      key: 'name',
      render: text => <span>SEL</span>,
    },
    {
      title: 'Amount',
      key: 'tags',
      dataIndex: 'amount',
      render: text => <span>{text}</span>,
    },
    {
      title: 'Date',
      key: 'tags',
      dataIndex: 'created_at',
      render: text => <span>{Timecon(text)}</span>,
    },
    {
      title: 'From',
      dataIndex: 'sender',
      render: text => <span>{sliceStr(text)}</span>,
    },
    {
      title: 'To',
      key: 'tags',
      dataIndex: 'destination',
      render: text => <span>{sliceStr(text)}</span>,
    },
    {
      title: 'Status',
      key: 'tags',
      dataIndex: 'tags',
      render: text => <span>complete</span>,
    },
  ];

  const Timecon = (time) => {
    const d = new Date(time);
    const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }); 
    const [{ value: mo },,{ value: da },,{ value: ye }] = dtf.formatToParts(d);
    const h = d.getHours();
    const m = d.getMinutes();
    return (`${h}:${m}, ${mo} ${da} ${ye}`);
  }

  const sliceStr = (str) => {
    if(str !== undefined) {
      const first = str.slice(0, 10);
      const last = str.slice(-2);
      return (`${first}...${last}`);
    }
  }

  const[payload, setPayload] = useState({
    trx: null,
    loading: true
  })

  useEffect(() => {
    AxiosInstance().get('/trx-history')
    .then((res) => {
      setPayload({
        trx: res.data,
        loading: false
      })
    })
  },[])

  return (
    <div className='transaction'>
      {payload.loading && (<Spin indicator={antIcon} />)}
      {!payload.loading && (
      <div className='transaction__container'>
        <span>Transaction</span>
        <div style={{padding: '1rem'}}></div>  
        <Table 
          className='ant-table-content'
          columns={columns} 
          dataSource={payload.trx}
          pagination={false}
        />
      </div>
      )}
    </div>
  )
}

export default Transaction;