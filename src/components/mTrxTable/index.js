import React from 'react';
import { Table } from 'antd';

export default function MTrxTable(props) {
  const columns = [
    {
      title: 'Amount',
      dataIndex: 'amount',
      render: text => <span>{text}</span>,
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
    }
  ];
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