import React, { useState } from 'react';
import { Input, Button, message } from 'antd';
import AxiosInstance from '../helpers/AxiosInstance';
import '../styles/Addphone.css';
import AuthLayout from '../components/AuthLayout';
import { ReactComponent as Phone } from '../assets/phone.svg';

function Addphone() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    AxiosInstance().post('/add-phonenumber', {
      phone: ('+855' + phone.replace(/^0+/, ''))
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
    <AuthLayout>
      <div className='addphone'>
        <div className='addphone__container'>
          <div className='addphone__sectionOne'>
            <span>Add phone number<br/> to verify</span>
          </div>
          <div className='addphone__sectionTwo'>
            <div className='addphone__input'>
              <Input
                placeholder='Phone'
                value={phone}
                onChange={ e => setPhone(e.target.value) }
              ></Input>
              <Phone className='addphone__icon'/>
            </div>
            <div className='addphone__btnAddPhone'>
              <Button onClick={handleSubmit} loading={loading}>Add Phone</Button>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Addphone;
