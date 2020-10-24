import React from 'react';
import '../styles/auth/LoginPhone.css';
import { Button, Input } from 'antd';
import { ReactComponent as Phone } from '../assets/phone.svg';
import { ReactComponent as Lock } from '../assets/lock.svg';

function LoginPhone() {
  return (
    <div className='loginPhone__field'>
      <div className='loginPhone__input'>
        <Input placeHolder='Phone'></Input>
        <Phone className='icon'/>
      </div>
      <div className='loginPhone__input'>
        <Input placeHolder='Password'></Input>
        <Lock className='icon'/>
        <Button type='link'>Forget Password ?</Button>
      </div>
      <div className='loginPhone__btn'>
        <Button>Login</Button>
        <Button>Dodn't have account?<span>Sign Up</span></Button>
      </div>
    </div>
  )
}

export default LoginPhone;
