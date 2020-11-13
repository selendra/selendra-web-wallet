import React, { useState, useEffect } from 'react';
import { Button, Modal, Table, Spin } from 'antd';
import '../styles/Wallet.css';
import { ReactComponent as Warning } from '../assets/warning.svg';
import { ReactComponent as Add } from '../assets/plus.svg';
import sel from '../assets/Selendra.png';
import AxiosInstance from '../helpers/AxiosInstance';
import { Doughnut } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';


function Wallet() {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

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
  const [datacollection, setdatacollection] = useState({});
  const [visible, setVisi] = useState(false);
  const [payload, setPayload] = useState({
    portfolio: null,
    trx: null,
    loading: true
  });

  useEffect(() => {
    const reqOne = AxiosInstance().get('/trx-history');
    const reqTwo = AxiosInstance().get('/portforlio');

    axios.all([reqOne, reqTwo])
    .then(axios.spread((...res) => {
      const portfolio = res[1].data;
      if(portfolio.error) {
        setVisi(true)
      } else {
        let balance = '';
        setPayload({
          loading: false,
          trx: res[0].data,
          portfolio: res[1].data,
        }); 
        balance = res[1].data.data.balance;
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
    }))
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
            dataSource={payload.trx}
            pagination={false}
            rowKey={record => record}
          />
        </div>
      </div>
      )}
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
  )
}

export default Wallet;