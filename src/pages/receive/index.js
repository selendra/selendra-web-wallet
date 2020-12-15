import React, { useState, useEffect } from 'react';
import { Dlayout, MTableTrx, TableTrx, Loading } from '../../components';
import { Row, Col, Card } from 'antd';
import { ReactComponent as Copy } from '../../assets/copy.svg';
import AxiosInstance from '../../helpers/AxiosInstance';
import axios from 'axios';
import QRCode from 'qrcode.react';
import './styles/receive.css';


export default function Receive() {
  const card = {
    background: '#181C35',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    width: '100%',
    height: '100%'
  }

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
  const sliceStr = (str) => {
    if(str !== undefined) {
      const first = str.slice(0, 10);
      const last = str.slice(-2);
      return (`${first}...${last}`);
    }
  }

  const [visible, setVisible] = useState(false);
  const [payload, setPayload] = useState({
    trx: null,
    user: null,
    portfolio: null,
    loading: true
  })

  useEffect(() => {
    const reqOne = AxiosInstance().get('/trx-history');
    const reqTwo = AxiosInstance().get('/userprofile');
    const reqThree = AxiosInstance().get('/portforlio');

    axios.all([reqOne, reqTwo, reqThree])
    .then(axios.spread((...res) => {
      if(res[2].data.error) {
        setVisible(true);
      } else {
        setPayload({
          trx: res[0].data,
          user: res[1].data,
          portfolio: res[2].data,
          loading: false
        })
      }
    }))
  }, [])

  return (
    <Dlayout>
      {payload.loading && (<Loading />)}
      {!payload.loading && (
      <div>
        <Row>
          <Col xs={24} sm={24} md={24} lg={10} xl={10}>
            <Card style={card}>
              <p className='receive__title'>Address</p>
              <Row align='middle' className='receive__address'>
                <Copy className='receive__btnCopy'/> {sliceStr(payload.user.wallet)}
              </Row>
              <br />
              <p className='receive__title'>QR Code</p>
              <Row>
                <Col span={12}>
                  <QRCode value={payload.user.wallet} className='receive__qr'/>
                </Col>
                <Col span={12}>
                  <div className='receive__qrDescription'>
                    <p>
                      Scan <span>QR Code</span> to get<br/>
                      <span>SEL</span> Address
                    </p>
                  </div>
                </Col>
              </Row>
            </Card> 
          </Col>
          <Col xs={0} sm={0} md={0} lg={{span: 12, offset: 2}} xl={{span: 12, offset: 2}}>
            <Card style={card}>
              <p className='receive__title'>Total Balance</p>
              <Row align='middle' style={{height: '100%'}}>
                <Col span={12}>
                  <p>SEL: {payload.portfolio.data.balance}</p>
                </Col>
                <Col span={12}>
                  
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <br/>
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