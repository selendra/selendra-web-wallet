import React from 'react';
import '../styles/auth/SignupPhone.css';
import { Button, Input } from 'antd';
import { ReactComponent as Phone } from '../assets/phone.svg';
import { ReactComponent as Lock } from '../assets/lock.svg';

function SignupPhone() {
  return (
    <div className='signupPhone__field'>
      <div className='signupPhone__input'>
        <Input placeHolder='Phone'></Input>
        <Phone className='icon'/>
      </div>
      <div className='signupPhone__input'>
        <Input placeHolder='Password'></Input>
        <Lock className='icon'/>
      </div>
      <div className='signupPhone__input'>
        <Input placeHolder='Confirm Password'></Input>
        <Lock className='icon'/>
      </div>
      <div className='signupPhone__btn'>
        <Button>Sign Up</Button>
      </div>
    </div>
  )
}

export default SignupPhone;
