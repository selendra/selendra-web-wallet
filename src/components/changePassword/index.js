import React,{ useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import './styles/changePassword.css';
import AxiosInstance from '../../helpers/AxiosInstance';


export default function ChangePassword() {
  const [loading, setLoading] = useState(false);

  const handleChangePassword = (val) => {
    setLoading(true);
    AxiosInstance().post('/change-password',{
      current_password: val.current_password,
      new_password: val.new_password
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
    <div className='changepassword'>
      <p>Change Password</p>
      <Form
        onFinish={handleChangePassword}
        layout='vertical'
      >
        <Form.Item
          label='Current Password'
          name="current_password"
          rules={[{ required: true, message: 'Please input your Current Password!' }]}
        >
          <Input type='password' />
        </Form.Item>
        <Form.Item
          label='New Password'
          name='new_password'
          rules={[{ required: true, message: 'Please input your New Password!' }]}
          hasFeedback
        >
          <Input type='password' />
        </Form.Item>
        <Form.Item
          label='Confirm New Password'
          name='new_password1'
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('new_password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The two passwords that you entered do not match!');
              },
            }),
          ]}
          hasFeedback
        >
          <Input type='password' />
        </Form.Item>
        <Form.Item>
          <div className='changepassword__btn'>
            <Button htmlType='submit' loading={loading}>Change Password</Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}