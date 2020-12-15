import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useHistory } from 'react-router-dom';
import AxiosInstance from '../../helpers/AxiosInstance';
import Cookie from 'js-cookie';
import './styles/signupPhone.css';


export default function Signupphone() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSignup = (val) => {
    setLoading(true);
    AxiosInstance().post('/registerbyphone', {
      phone: ('+855' + val.phone.replace(/^0+/, '')),
      password: val.password
    })
    .then((res) => {
      if(res.data.message === "Successfully registered!") {
        message.success(res.data.message);
        Cookie.set('phone', val.phone);
        history.push('/verifyphone');
      } else {
        message.error(res.data.message);
      }
    })
    setLoading(false);
  }

  return (
    <div className='signupphone'>
      <Form onFinish={handleSignup}>
        <Form.Item
          name="phone"
          rules={[{ required: true, message: 'Please input your Phone Number!' }]}
        >
          <Input className='signupphone__phoneField' placeholder='Phone'/>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
          hasFeedback
        >
          <Input.Password className='signupphone__passwordField' placeholder='Password'/>
        </Form.Item>
        <Form.Item
          name="confirm_password"
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The two passwords that you entered do not match!');
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password className='signupphone__passwordField' placeholder='Confirm Password'/>
        </Form.Item>
        <Form.Item>
          <div className='signupphone__btnSignup'>
            <Button htmlType="submit" loading={loading}>Sign Up</Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}