// Modules
import React, { useState } from 'react';
import AxiosInstance from '../helpers/AxiosInstance';
// Components
import { Input, Button, message } from 'antd';
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
      <div className='verifyaddphone'>
        <div className='verifyaddphone__container'>
          <div className='verifyaddphone__sectionOne'>
            <p>Verify Phone Number</p>
            <span>Selendra will send <br/>you a verification code</span>
          </div>
          <div className='verifyaddphone__sectionTwo'>
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
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default VerifyAddphone;
