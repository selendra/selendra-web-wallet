import React, { useState } from 'react';
import { Form, Button, Input, message } from 'antd';
import AxiosInstance from '../../helpers/AxiosInstance';
import './styles/forgetphone.css';
import { useHistory } from 'react-router-dom';

function ForgetPhone() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleForget = (val) => {
    setLoading(true);
    AxiosInstance().post('/forget-password', {
      phone: ('+855' + val.phone.replace(/^0+/, '')),
    })
    .then((res) => {
      if(res.data) {
        message.success(res.data.message);
        history.push('/resetpassword');
      } else if(res.data.error.message) {
        message.error(res.data.error.message);
      } 
      setLoading(false);
    })
  }

  return (
    <div className='forgetphone'>
      <Form onFinish={handleForget}>
        <Form.Item
          name="phone"
          rules={[{ required: true, message: 'Please input your Phone Number!' }]}
        >
          <Input className='forgetphone__phoneField' placeholder='Phone'/>
        </Form.Item>
        <Form.Item>
          <div className='forgetphone__btnSend'>
            <Button htmlType="submit" loading={loading}>Send</Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ForgetPhone
