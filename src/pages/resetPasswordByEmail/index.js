import React, { useState } from 'react'
import { Auth } from '../../components';
import { Row, Form, Input, Button, message } from 'antd';
import AxiosInstance from '../../helpers/AxiosInstance';
import './styles/resetpassword.css'
import { useHistory } from 'react-router-dom';

export default function ResetPasswordByEmail() {
  const [loading, setLoading] = useState(false);
  const [temp_code, setTemp_code] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleReset = (val) => {
    setLoading(true)
    AxiosInstance().post('/reset-password', {
      temp_code: val.temp_code,
      email: val.email,
      password: val.password
    })
    .then((res) => {
      if(res.data) {
        message.success(res.data.message);
        history.push('/login')
      } else if(res.data.error.message) {
        message.error(res.data.error.message);
      } 
      setLoading(false);
    })
  }
  return (
    <Auth>
      <div className='resetpassword'>
        <Row className='resetpassword__container' align='middle'>
          <div style={{width: '100%'}}>
            <div>
              <p className='resetpassword__Title'>Reset Password</p>
            </div>
            <Form onFinish={handleReset}>
              <Form.Item
                name="temp_code"
                rules={[{ required: true, message: 'Please input your Temp Code!' }]}
              >
                <Input className='resetpassword__Field' placeholder='Temp Code'/>
              </Form.Item>
              <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your Email Address!' }]}
              >
                <Input className='resetpassword__Field' placeholder='Email'/>
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
              >
                <Input className='resetpassword__Field' placeholder='Password'/>
              </Form.Item>
              <Form.Item>
                <div className='resetpassword__btnReset'>
                  <Button htmlType="submit" loading={loading}>Reset</Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </Row>
      </div>
    </Auth>
  )
}