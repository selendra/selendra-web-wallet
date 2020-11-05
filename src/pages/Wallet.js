import React, { useState, useEffect } from 'react';
import { Button, Modal, Tag, Table, Space } from 'antd';
import '../styles/Wallet.css';
import { ReactComponent as Warning } from '../assets/warning.svg';
import { ReactComponent as Add } from '../assets/plus.svg';
import sel from '../assets/Selendra.png';
import AxiosInstance from '../helpers/AxiosInstance';

function Wallet() {
  const [visible, setVisi] = useState(false);
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

  useEffect(() => {
    AxiosInstance().get('/portforlio')
  }, [])

  return (
    <div className='wallet'>
      <div className='wallet__container'>
        <div className='wallet__rowOne'>
          <div className='wallet__chart'>
            <span>Total Balance</span>
            
          </div>
          <div className='wallet__asset'>
            <div className='wallet__assetContainer'>
              <div className='wallet__onceAsset'>
                <img src={sel} alt='sel' />
                <span>1118</span>
                <span>SEL</span>
              </div>
              
            </div>
          </div>
          <div className='wallet__addAsset'>
            <Add className='wallet__addIcon'/>
          </div>
        </div>
        <div className='wallet__rowTwo'>
          <span>Recent Transaction</span>
          <Table 
            className='ant-table-content'
            columns={columns} 
            dataSource={data}
            pagination={false}
          />
        </div>




        {/* <Modal
          title=""
          visible={visible}
          footer={null}
          closable={false}
          centered
          bodyStyle={modalStyle}
          width={880}
        >
          <p className='wallet__modalTitle'>
            <Warning className='wallet__modalIcon'/> Warning
          </p>
          <div className='wallet__modalContainer'>
            <div className='wallet__modalDescription'>
              <p>Look like you don't have wallet yet!!</p>
            </div>
          </div>
          <div className='wallet__modalButton'>
            <Link to='/getwallet'>
              <Button>Get Wallet</Button>
            </Link>
          </div>
        </Modal> */}
      </div>
    </div>
  )
}

export default Wallet;