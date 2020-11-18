// Modules
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AxiosInstance from '../helpers/AxiosInstance';
import Cookie from 'js-cookie';
// Components
import { Button, Input, message } from 'antd';
import { ReactComponent as LoginAI } from '../assets/Login-ai.svg';
import { ReactComponent as Phone } from '../assets/phone.svg';
import { ReactComponent as Chat } from '../assets/chat.svg';
import selendra from '../assets/Selendra.png';
// Styles
import '../styles/auth/Login.css';
import '../styles/VerifyPhone.css';

function Verifphone() {
  const [phone, setPhone] = useState('');
  const [verification_code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds ] =  useState(60);
  const history = useHistory();

  const handleVerify = () => {
    setLoading(true);
    AxiosInstance().post('/account-confirmation', {
      phone: ('+855' + phone.replace(/^0+/, '')),
      verification_code
    })
    .then((res) => {
      if(res.data.message) {
        message.success(res.data.message);
        Cookie.remove('phone');
        history.push('/login')
      } else {
        message.error(res.data.error.message);
      }
      setLoading(false);
    })
    .catch((err) => {
      message.error('something went wrong at our end!');
    })
  }

  const handleResend = () => {
    AxiosInstance.post('/resend-code',{
      phone: ('+855' + phone.replace(/^0+/, ''))
    })
    .then((res)=> {
      message.success('Verification code has been sent');
      setSeconds(60);
    })
    .catch((err)=> {
      message.error('something went wrong at our end');
    })
  }

  useEffect(()=>{
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000)
    return ()=> {
      clearInterval(myInterval);
    };
  });

  return (
    <div className='verify'>
      <div className='verify__sectionOne'>
        <img src={selendra} alt='sel_logo'/>
        <p className='verify__title'>SELENDRA</p>
        <p className='verify__description'>
          A multi-use cases blockchain
          super-app for the Internet 2.0
        </p>
        <LoginAI className='verify__ai'/>
      </div>
      <div className='verify__sectionTwo'>
        <div className='verify__container'>
          <div className='verify__block'>
            <p>Verify Phone number</p>
            <p>Selendra just you a verification code</p>
            <div className='verify__input'>
              <Input 
                placeholder='Phone'
                onChange={ e => setPhone(e.target.value) }
                value={phone}
              ></Input>
              <Phone className='icon'/>
            </div>
            <div className='verify__input'>
              <Input
                placeholder='Verification Code'
                type='number'
                onChange={ e => setCode(e.target.value) }
                value={verification_code}
              ></Input>
              <Chat className='icon'/>
            </div>
            <div className='verify__btnConfirm'>
              <Button onClick={handleVerify} loading={loading}>Confirm</Button>
            </div>
            <div className='verify__btnResend'>
              {
                seconds !== 0 ? <p>Didn't get code? <span>Resend in {seconds}</span></p> : <Button type='text' onClick={handleResend}>Resend Code</Button>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Verifphone;
