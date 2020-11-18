// Modules
import React, { useEffect, useState } from 'react';
import AxiosInstance from '../helpers/AxiosInstance';
// Components
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
// Styles
import '../styles/Transaction.css';
import TableTransaction from '../components/TableTransaction';
import MTableTransaction from '../components/mobile/MTableTransaction';

function Transaction() {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

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
          {/* <TableTransaction trx={payload.trx}/> */}
          <MTableTransaction trx={payload.trx} />
        </div>
      )}
    </div>
  )
}

export default Transaction;