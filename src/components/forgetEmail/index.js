import React, { useState } from 'react';
import { Form, Button, Input, message } from 'antd';
import AxiosInstance from '../../helpers/AxiosInstance';
import { useHistory } from 'react-router-dom';

function ForgetEmail() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  
  const handleForget = (val) => {
    setLoading(true);
    AxiosInstance().post('/forget-password-by-email', {
      email: val.email,
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
          name="email"
          rules={[{ required: true, message: 'Please input your Email Address!' }]}
        >
          <Input className='forgetphone__phoneField' placeholder='Email'/>
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

export default ForgetEmail
