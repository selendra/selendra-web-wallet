import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Auth } from '../../components';
import { Row, Col, Input, Select, Form, Button, message } from 'antd';
import './styles/verifyuser.css';
import AxiosInstance from '../../helpers/AxiosInstance';

export default function VerifyUser() {
  const { Option, OptGroup } = Select;
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleVerify = (val) => {
    setLoading(true);
    AxiosInstance().post('/userprofile', {
      first_name: val.first_name,
      mid_name: val.mid_name,
      last_name: val.last_name,
      gender: val.gender
    })
    .then((res) => {
      message.success(res.data.message);
      setLoading(false);
      history.push('/setting');
    })
  }

  return (
    <Auth>
      <div className='verifyuser'>
        <Row align='middle' justify='center'>
          <Col style={{maxWidth: '590px', width: '100%'}}>
            <p>Verify User</p>
            <Form onFinish={handleVerify}>
              <Form.Item
                name='first_name'
                rules={[{ required: true, message: 'Please input your First Name!' }]}
              >
                <Input placeholder='First Name'/>
              </Form.Item>
              <Form.Item
                name='middle_name'
              >
                <Input placeholder='Middle Name'/>
              </Form.Item>
              <Form.Item
                name='last_name'
                rules={[{ required: true, message: 'Please input your Last Name!' }]}
              >
                <Input placeholder='Last Name'/>
              </Form.Item>
              <Form.Item
                name='gender'
                rules={[{ required: true, message: 'Please input your Gender!' }]}
              >
                <Select placeholder='Gender'>
                  <OptGroup label="Gender">
                    <Option value="M">Male</Option>
                    <Option value="F">Female</Option>s
                  </OptGroup>
                </Select>
              </Form.Item>
              <Form.Item>
                <div className='verifyuser__btn'>
                  <Button loading={loading} htmlType='submit'>Verify</Button>
                </div>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </Auth>
  )
}