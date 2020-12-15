import React, { useState } from 'react'
import { Row, Col, Button, message } from 'antd';
import PinField from 'react-pin-field';
import './style/changepin.css';
import AxiosInstance from '../../helpers/AxiosInstance';

export default function ChangePin() {

  const [loading, setLoading] = useState(false);
  const [current_pin, setCurrentPin] = useState('');
  const [new_pin, setNewPin] = useState('');
  const [new_pin1, setNewPin1] = useState('');

  const handleChangePin = () => {
    setLoading(true);
    AxiosInstance().post('/change-pin', {
      current_pin,
      new_pin
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
    <div className='changepin'>
      <p>Change PIN</p>
      <Row justify='center'>
        <Col>
          <p>Current PIN</p>
          <div>
            <PinField 
              className="field-a"
              validate="0123456789"
              length="4"
              type="password"
              onChange={setCurrentPin}
            />
          </div>
          <div>
            <p>New PIN</p>
            <PinField 
              className="field-a"
              validate="0123456789"
              length="4"
              type="password"
              onChange={setNewPin}
            />
          </div>
          <div>
            <p>Confirm New PIN</p>
            <PinField 
              className="field-a"
              validate="0123456789"
              length="4"
              type="password"
              onChange={setNewPin1}
            />
          </div>
          <div className='changepin__btn'>
            <Button loading={loading} onClick={handleChangePin}>Change PIN</Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}