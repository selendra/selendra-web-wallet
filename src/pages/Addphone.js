// Module
import React, { useState } from 'react';
import AxiosInstance from '../helpers/AxiosInstance';
// Components
import { Input, Button, message, Row, Col } from 'antd';
import { ReactComponent as Phone } from '../assets/phone.svg';
import AuthLayout from '../components/AuthLayout';
// Styles
import '../styles/Addphone.css';

export default function Addphone() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    AxiosInstance().post('/add-phonenumber', {
      phone: ('+855' + phone.replace(/^0+/, ''))
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
      <Row justify='center' align="middle" className='addphone__container'>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <div className='addphone__sectionOne'>
            <span>Add phone number to verify</span>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <div className='addphone__input'>
            <Input
              placeholder='Phone'
              value={phone}
              onChange={ e => setPhone(e.target.value) }
            ></Input>
            <Phone className='addphone__icon'/>
          </div>
          <div className='addphone__btnAddPhone'>
            <Button onClick={handleSubmit} loading={loading}>Add Phone</Button>
          </div>
        </Col>
      </Row>
    </AuthLayout>
  )
}