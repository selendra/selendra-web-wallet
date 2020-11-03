import { Button, Table, Tag, Space } from 'antd';
import React from 'react';
import '../styles/Receive.css';
import { ReactComponent as Copy } from '../assets/copy.svg';
import QRCode from 'qrcode.react';

function Receive() {
  const modalStyle = {
    color: '#fff',
    background: '#181C35',
    borderRadius: '8px',
    textAlign: 'center'
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <span>{text}</span>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <span>Invite {record.name}</span>
          <span>Delete</span>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  const onCopy = () => {
    /* Get the text field */
    var copyText = document.getElementById("receive__wallet");
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/
    /* Copy the text inside the text field */
    document.execCommand("copy");
    /* Alert the copied text */
    alert("Copied the text: " + copyText.value);
  }

  return (
    <div className='receive'>
      <div className='receive__container'>
        <div className='receive__upper'>
          <div className='receive__qr'>
            <p>Address</p>
            <div className='receive__copy'>
              <Copy className='receive__btnCopy' onClick={onCopy}/>
              <p>xxxxxxxxxxxxxxx</p>
            </div>
            <p>QR Code</p>
            <input type="text" id="receive__wallet" value=''/>
            <div className='receive__qrContainer'>
              <div className='receive__qrPic'>
                <QRCode value="http://facebook.github.io/react/"/>
              </div>
              <div className='receive__qrDescription'>
                <p>
                  Scan <span>QR Code</span> to get<br/>
                  <span>SEL</span> Address
                </p>
              </div>
            </div>
          </div>
          <div className='receive__balance'>
            <p>Total Balance</p>
            <div className='receive__total'>
              <div className='receive__totalBalance'>
                <span>SEL: 1152</span>
              </div>
              <div className='receive__chart'>

              </div>
            </div>
          </div>
        </div>
        <div className='receive__lower'>
          <p>Transaction</p>
          <Table 
            className='ant-table-content'
            columns={columns} 
            dataSource={data}
            pagination={false}
          />
        </div>
      </div>
    </div>
  )
}

export default Receive
