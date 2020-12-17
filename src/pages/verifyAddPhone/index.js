import React, { useState } from 'react';
import { Auth } from '../../components';
import { Row, Col, Input, Button, message } from 'antd';
import './styles/verifyaddphone.css';
import AxiosInstance from '../../helpers/AxiosInstance';


export default function VerifyAddPhone() {
  const [loading, setLoading] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [phone, setPhone] = useState('');
  const [verification_code, setVerification] = useState('');

  const handleVerify = (val) => {
    if(!isCode) {
      setLoading(true);
      AxiosInstance().post('/resend-code', {
        phone: ('+855' + phone.replace(/^0+/, ''))
      })
      .then((res) => {
        if(res.data.message) {
          message.success(res.data.message);
          setIsCode(true);
        } else {
          message.error(res.data.error.message);
        }
        setLoading(false);
      })
    } else if(isCode) {
      setLoading(true);
      AxiosInstance().post('/account-confirmation', {
        phone: ('+855' + phone.replace(/^0+/, '')),
        verification_code
      })
      .then((res) => {
        if(res.data.message) {
          message.success(res.data.message);
        } else {
          message.error(res.data.error.message);
        }
        setLoading(false);
      })
    }
  }

  return (
    <Auth>
      <div className='verifyaddphone'>
        <Row className='verifyaddphone__container' align='middle' style={{height: '100%'}}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <div className='verifyaddphone__greeting'>
              <p>Verify Phone Number</p>
              <span>Selendra will send you a verification code</span>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <div>
              <Input 
                placeholder='Phone Number'
                value={phone}
                onChange={ (evt) => setPhone(evt.target.value) }
              />
              {isCode && (
                <Input 
                  placeholder='Verification Code'
                  value={verification_code}
                  onChange={ (evt) => setVerification(evt.target.value) }
                />
              )}
              <div className='verifyaddphone__btn'>
                <Button onClick={handleVerify} loading={loading}>{isCode ? 'Verify' : 'Send Code'}</Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Auth>
  )
}