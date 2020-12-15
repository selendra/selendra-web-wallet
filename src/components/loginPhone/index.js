import React, { useState } from 'react';
import { Button, Form, Input, Row, message } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import Cookie from 'js-cookie';
import AxiosInstance from '../../helpers/AxiosInstance';
import './styles/loginPhone.css';


export default function LoginPhone() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleLogin = (val) => {
    setLoading(true);
    AxiosInstance().post('/loginbyphone', {
      phone: ('+855' + val.phone.replace(/^0+/, '')),
      password: val.password
    })
    .then((res) => {
      if(res.data.token) {
        message.success('Login Successfully');
        Cookie.set('token', res.data.token);
        history.push('/');
      } else if(res.data.message) {
        message.error(res.data.message);
      } else {
        message.error(res.data.error.message);
      }
      setLoading(false);
    })
  }
  return (
    <div className='loginphone'>
      <Form onFinish={handleLogin}>
        <Form.Item
          name="phone"
          rules={[{ required: true, message: 'Please input your Phone Number!' }]}
        >
          <Input className='loginphone__phoneField' placeholder='Phone'/>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password className='loginphone__passwordField' placeholder='Password'/>
        </Form.Item>
        <Form.Item>
          <div className='loginphone__btnLogin'>
            <Button htmlType="submit" loading={loading}>Login</Button>
          </div>
        </Form.Item>
      </Form>
      <Row justify="center" className='loginphone__mSignup'>
        <Link to='/signup'>Don't have Account? <span>Sign Up</span></Link>
      </Row>
    </div>
  )
}