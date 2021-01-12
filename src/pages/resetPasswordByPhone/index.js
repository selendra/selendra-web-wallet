import React, { useState } from 'react'
import { Auth } from '../../components';
import { Row, Form, Input, Button, message } from 'antd';
import AxiosInstance from '../../helpers/AxiosInstance';
import { useHistory } from 'react-router-dom';

export default function ResetPasswordByPhone() {
  const [loading, setLoading] = useState(false);
  const [temp_code, setTemp_code] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleReset = (val) => {
    setLoading(true)
    AxiosInstance().post('/reset-password-by-phone', {
      temp_code: val.temp_code,
      phone: ('+855' + val.phone.replace(/^0+/, '')),
      password: val.password
    })
    .then((res) => {
      if(res.data) {
        message.success(res.data.message);
        history.push('/login');
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
                name="phone"
                rules={[{ required: true, message: 'Please input your Phone number!' }]}
              >
                <Input className='resetpassword__Field' placeholder='Phone'/>
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