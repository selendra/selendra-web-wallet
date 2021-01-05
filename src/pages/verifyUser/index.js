import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Auth } from '../../components';
import { Row, Col, Input, Select, Form, Button, message, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './styles/verifyuser.css';
import AxiosInstance from '../../helpers/AxiosInstance';
import axios from 'axios';

export default function VerifyUser() {
  const { Option, OptGroup } = Select;
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

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

  const handleUpload = () => {
    console.log(imageUrl)
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }
  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        setImageUrl({imageUrl}),
        setLoading(false)
      );
    }
  };
  return (
    <Auth>
      <div className='verifyuser'>
        <Row align='middle' justify='center'>
          <Col style={{maxWidth: '590px', width: '100%'}}>
            <p>Verify User</p>
            <Row justify='center'>
              <div>
              <Upload
                name="avatar"
                className="avatar-uploader"
                listType="picture-card"
                showUploadList={false}
                onChange={handleChange}
                beforeUpload={beforeUpload}
                action='https://s3.selendra.com/upload'
              >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload>
              </div>
            </Row>
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