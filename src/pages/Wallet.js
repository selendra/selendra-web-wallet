import React, { useState, useEffect } from 'react';
import { Button, Modal, Tag, Table, Space, Spin } from 'antd';
import '../styles/Wallet.css';
import { ReactComponent as Warning } from '../assets/warning.svg';
import { ReactComponent as Add } from '../assets/plus.svg';
import sel from '../assets/Selendra.png';
import AxiosInstance from '../helpers/AxiosInstance';
import { Doughnut } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';


function Wallet() {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const [datacollection, setdatacollection] = useState({});
  const [visible, setVisi] = useState(false);
  const [payload, setPayload] = useState({
    portfolio: null,
    loading: true
  });

  const modalStyle = {
    color: '#fff',
    background: '#181C35',
    borderRadius: '8px',
    textAlign: 'center'
  }

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
      render: text => <span>{(text)}</span>,
    },
    {
      title: 'From',
      dataIndex: 'sender',
      render: text => <span>{(text)}</span>,
    },
    {
      title: 'To',
      key: 'tags',
      dataIndex: 'destination',
      render: text => <span>{(text)}</span>,
    },
    {
      title: 'Status',
      key: 'tags',
      dataIndex: 'tags',
      render: text => <span>complete</span>,
    },
  ];

  useEffect(() => {
    filldata();
  }, [])

  const filldata = () => {
    const data = {
      
    }
  }

  useEffect(() => {
    AxiosInstance().get('/portforlio')
    .then((res) => {
      const portfolio = res.data;
      if(portfolio.error) {
        setVisi(true)
      } else {
        let balance = '';
        setPayload({
          loading: false,
          portfolio: res.data
        }); 
        balance = res.data.data.balance;
        setdatacollection({
          labels: ['SEL'],
          datasets: [
            {
              label: 'Portfolio',
              data: [balance],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        })
      }
    })
  }, [])

  return (
    <div className='wallet'>
      {payload.loading && (<Spin indicator={antIcon} />)}
      {!payload.loading && (
      <div className='wallet__container'>
        <div className='wallet__rowOne'>
          <div className='wallet__chart'>
            <span>Total Balance</span>
            <div className='wallet__chartContainer'>
              <div className='wallet__chartColOne'>
                <Doughnut data={datacollection} />
              </div>
              <div className='wallet__chartColTwo'>
                <p>SEL: {payload.portfolio.data.balance}</p>
              </div>
            </div>
          </div>
          <div className='wallet__asset'>
            <div className='wallet__assetContainer'>
              <div className='wallet__onceAsset'>
                <img src={sel} alt='sel' />
                <span>{payload.portfolio.data.balance}</span>
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
            // dataSource={}
            pagination={false}
          />
        </div>


        <Modal
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
        </Modal>
      </div>
      )}
    </div>
  )
}

export default Wallet;