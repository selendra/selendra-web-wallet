import React from 'react';
import { Table } from 'antd';
import './styles/transaction.css';


export default function TableTrx(props) {
  const columns = [
    {
      title: 'Asset',
      dataIndex: 'name',
      render: text => <span>SEL</span>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      render: text => <span>{text}</span>,
    },
    {
      title: 'Date',
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
      dataIndex: 'destination',
      render: text => <span>{sliceStr(text)}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'tags',
      render: text => <span>complete</span>,
    },
  ];
  // Function
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
 // End Function
  return (
    <div className='tabletransaction'>
      <Table 
        className='ant-table-content'
        columns={columns} 
        dataSource={props.trx}
        pagination={false}
        rowKey={record => record.uid}
        scroll={{ y: 240 }}
      />
    </div>
  )
}