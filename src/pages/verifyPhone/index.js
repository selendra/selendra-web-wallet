import { Button, Row, Col, message, Input, Form } from 'antd';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Auth } from '../../components';
import AxiosInstance from '../../helpers/AxiosInstance';
import Cookie from 'js-cookie';
import './styles/verifyPhone.css';


export default function VerifyPhone() {
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [phone, setPhone] = useState('');
  const history = useHistory();

  useEffect(()=>{
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000)
    return ()=> {
      clearInterval(myInterval);
    };
  });

  const handleResend = () => {
    AxiosInstance().post('/resend-code',{
      phone: ('+855' + phone.replace(/^0+/, ''))
    })
    .then((res)=> {
      message.success('Verification code has been sent');
      setSeconds(60);
    })
    .catch((err)=> {
      message.error('something went wrong at our end');
    })
  }

  const handleVerify = (val) => {
    setLoading(true);
    AxiosInstance().post('/account-confirmation', {
      phone: ('+855' + val.phone.replace(/^0+/, '')),
      verification_code: val.verification_code
    })
    .then((res) => {
      if(res.data.message) {
        message.success(res.data.message);
        Cookie.remove('phone');
        history.push('/login')
      } else {
        message.error(res.data.error.message);
      }
      setLoading(false);
    })
    .catch((err) => {
      message.error('something went wrong at our end!');
    })
  }

  return (
    <Auth>
      <div className='verifyphone'>
        <Row className='verifyphone__container'>
          <Col xs={24} sm={24} md={24} lg={10} xl={10}>
            <Row align='middle' className='verifyphone__left'>
              <div className='verifyphone__greeting'>
                <p>Verify Phone Number</p>
                <p>Selendra just send you a verification code</p>
              </div>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={24} lg={14} xl={14}>
            <Row align='middle' className='verifyphone__right'> 
              <div style={{width: '100%'}}>
                <Form onFinish={handleVerify}>
                  <Form.Item
                    name="phone"
                    rules={[{ required: true, message: 'Please input your Phone Number!' }]}
                  >
                    <Input 
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder='Phone'
                    />
                  </Form.Item>
                  <Form.Item
                    name="verification_code"
                    rules={[{ required: true, message: 'Please input your Phone Number!' }]}
                  >
                    <Input placeholder='Verification Code'/>
                  </Form.Item>
                  <Form.Item>
                    <div className='verifyphone__btnVerify'>
                      <Button htmlType='submit' loading={loading}>Verify</Button>
                    </div>
                  </Form.Item>
                </Form>
                <div className='verifyphone__btnResend'>
                  {
                    seconds !== 0 ? <p>Didn't get code? <span>Resend in {seconds}</span></p> : <Button type='text' htmlType='submit' onClick={handleResend}>Resend</Button>
                  }
                  </div>
              </div>
            </Row>
          </Col>
        </Row>
      </div>
    </Auth>
  )
}
