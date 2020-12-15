import React, { useState, useEffect } from 'react';
import { Dlayout, Loading, MTableTrx, TableTrx } from '../../components';
import { Row, Col } from 'antd';
import AxiosInstance from '../../helpers/AxiosInstance';
import './styles/transaction.css';

export default function Transaction() {
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
    <Dlayout>
    {payload.loading && (<Loading />)}
    {!payload.loading && ( 
        <div className='transaction'>
          <p>Transaction</p>
          <Row>
            <Col xs={0} sm={0} md={0} lg={24} xl={24}>
             <TableTrx trx={payload.trx}/>
            </Col>
            <Col xs={24} sm={24} md={24} lg={0} xl={0}>
              <MTableTrx trx={payload.trx}/>
            </Col>
          </Row>
        </div>
    )}
    </Dlayout>
  )
}