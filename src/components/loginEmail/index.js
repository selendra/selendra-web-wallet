import React, { useState } from 'react';
import { Button, Form, Input, Row, message } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import Cookie from 'js-cookie';
import AxiosInstance from '../../helpers/AxiosInstance';
import './styles/loginEmail.css';


export default function Loginemail() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleLogin = (val) => {
    setLoading(true);
    AxiosInstance().post('/loginbyemail', {
      email: val.email,
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
    <div className='loginemail'>
      <Form onFinish={handleLogin}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your Phone Number!' }]}
        >
          <Input className='loginemail__emailField' placeholder='Email'/>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password className='loginemail__passwordField' placeholder='Password'/>
        </Form.Item>
        <Form.Item>
          <div className='loginemail__btnLogin'>
            <Button htmlType="submit" loading={loading}>Login</Button>
          </div>
        </Form.Item>
      </Form>
      <Row justify="center" className='loginemail__mSignup'>
        <Link to='/signup'>Don't have Account? <span>Sign Up</span></Link>
      </Row>
    </div>
  )
}