import React from 'react';
import '../styles/LoginEmail.css';
import { Button, Input } from 'antd';
import { ReactComponent as Email } from '../assets/email.svg';
import { ReactComponent as Lock } from '../assets/lock.svg';

function LoginEmail() {
  return (
    <>
      <div className='loginEmail__input'>
        <Input placeHolder='Email'></Input>
        <Email className='icon'/>
      </div>
      <div className='loginEmail__input'>
        <Input placeHolder='Password'></Input>
        <Lock className='icon'/>
      </div>
      <div className='loginEmail__btn'>
        <Button>Login</Button>
        <Button>Recovery Password</Button>
      </div>
    </>
  )
}

export default LoginEmail;
