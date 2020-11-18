// Modules
import React, { useState, useEffect } from 'react';
import AxiosInstance from '../helpers/AxiosInstance';
import { Link } from 'react-router-dom';
import axios from 'axios';
// Components
import { Button, Modal, Spin } from 'antd';
import { ReactComponent as Warning } from '../assets/warning.svg';
import { ReactComponent as Add } from '../assets/plus.svg';
import { LoadingOutlined } from '@ant-design/icons';
import { Doughnut } from 'react-chartjs-2';
import sel from '../assets/Selendra.png';
import TableTransaction from '../components/TableTransaction';
// Styles
import '../styles/Wallet.css';
import MTableTransaction from '../components/mobile/MTableTransaction';


function Wallet() {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const modalStyle = {
    color: '#fff',
    background: '#181C35',
    borderRadius: '8px',
    textAlign: 'center'
  }

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
        setVisi(true);
      } else {
        setPayload({
          loading: false,
          trx: res[0].data,
          portfolio: res[1].data,
        }); 
        let balance = res[1].data.data.balance;
        setdatacollection({
          labels: ['SEL'],
          options: {
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: 100
                }
            }
          },
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
                {/* <Doughnut data={datacollection} className='wallet__doughnut'/> */}
                <Doughnut data={datacollection} width='160' className='wallet__doughnutResponsive'/>
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
            <div className='wallet__addAsset'>
              <Add className='wallet__addIcon'/>
            </div>
          </div>
        </div>
        <div className='wallet__rowTwo'>
          <span>Recent Transaction</span>
          {/* <TableTransaction trx={payload.trx}/> */}
          <MTableTransaction trx={payload.trx}/>
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