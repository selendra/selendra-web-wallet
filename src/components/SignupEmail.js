import React from 'react';
import '../styles/auth/SignupEmail.css';
import { Button, Input } from 'antd';
import { ReactComponent as Email } from '../assets/email.svg';
import { ReactComponent as Lock } from '../assets/lock.svg';

function LoginEmail() {
  return (
    <div className='signupEmail__field'>
      <div className='signupEmail__input'>
        <Input placeHolder='Email'></Input>
        <Email className='icon'/>
      </div>
      <div className='signupEmail__input'>
        <Input placeHolder='Password'></Input>
        <Lock className='icon'/>
      </div>
      <div className='signupEmail__input'>
        <Input placeHolder='Confirm Password'></Input>
        <Lock className='icon'/>
      </div>
      <div className='signupEmail__btn'>
        <Button>Sign Up</Button>
      </div>
    </div>
  )
}

export default LoginEmail;
