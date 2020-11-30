// Modules
import React, { useState } from 'react';
import AxiosInstance from '../helpers/AxiosInstance';
// Components
import { Input, Button, message, Row, Col } from 'antd';
import AuthLayout from '../components/AuthLayout';
import { ReactComponent as Phone } from '../assets/phone.svg';
import { ReactComponent as Chat } from '../assets/chat.svg';
// Styles
import '../styles/VerifyAddphone.css';

function VerifyAddphone() {
  const [payload, setPayload] = useState({
    phone: '',
    verification_code: ''
  });
  const [codeField, setCodeField] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendCode = () => {
    setLoading(true);
    AxiosInstance().post('/resend-code', {
      phone: ('+855' + payload.phone.replace(/^0+/, ''))
    })
    .then((res) => {
      if(res.data.message) {
        message.success(res.data.message);
        setCodeField(true);
      } else {
        message.error(res.data.error.message);
      }
      setLoading(false);
    })
  }

  const handleVerify = () => {
    setLoading(true);
    AxiosInstance().post('/account-confirmation', {
      phone: ('+855' + payload.phone.replace(/^0+/, '')),
      verification_code: payload.verification_code
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

  return (
    <AuthLayout>
      <Row align='middle' className='verifyaddphone__container'>
        <Col xs={24} sm={24} md={24} lg={10} xl={10}>
          <div className='verifyaddphone__sectionOne'>
            <p>Verify Phone Number</p>
            <span>Selendra will send you a verification code</span>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <div className='addphone__input'>
            <Input
              placeholder='Phone'
              value={payload.phone}
              onChange={ e => setPayload(e.target.value) }
            ></Input>
            <Phone className='addphone__icon'/>
          </div>
          {codeField && (<>
            <div className='addphone__input'>
              <Input
                placeholder='Verification Code'
                value={payload.verification_code}
                onChange={ e => setPayload(e.target.value) }
              ></Input>
              <Chat className='addphone__icon'/>
            </div>
            <div className='addphone__btnVerify'>
              <Button onClick={handleVerify} loading={loading}>Verify</Button>
            </div>
          </>)}
          {!codeField && (
            <div className='addphone__btnSendCode'>
              <Button onClick={handleSendCode} loading={loading}>Send Code</Button>
            </div>
          )}
        </Col>
      </Row>
    </AuthLayout>
  )
}

export default VerifyAddphone;
