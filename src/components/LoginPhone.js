import React from 'react';
import '../styles/LoginPhone.css';

import { Button, Input } from 'antd';

import { ReactComponent as Phone } from '../assets/phone.svg';
import { ReactComponent as Lock } from '../assets/lock.svg';

function LoginPhone() {
  return (
    <>
      <div className='loginPhone__input'>
        <Input placeHolder='Phone'></Input>
        <Phone className='icon'/>
      </div>
      <div className='loginPhone__input'>
        <Input placeHolder='Password'></Input>
        <Lock className='icon'/>
      </div>
      <div className='loginPhone__btn'>
        <Button>Login</Button>
        <Button>Recovery Password</Button>
      </div>
    </>
  )
}

export default LoginPhone
