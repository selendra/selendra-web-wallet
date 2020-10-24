import React from 'react';
import '../styles/auth/LoginEmail.css';
import { Button, Input } from 'antd';
import { ReactComponent as Email } from '../assets/email.svg';
import { ReactComponent as Lock } from '../assets/lock.svg';

function LoginEmail() {
  return (
    <div className='loginEmail__field'>
      <div className='loginEmail__input'>
        <Input placeHolder='Email'></Input>
        <Email className='icon'/>
      </div>
      <div className='loginEmail__input'>
        <Input placeHolder='Password'></Input>
        <Lock className='icon'/>
        <Button type='link'>Forget Password ?</Button>
      </div>
      <div className='loginEmail__btn'>
        <Button>Login</Button>
        <Button>Don't have account?<span>Sign Up</span></Button>
      </div>
    </div>
  )
}

export default LoginEmail;
