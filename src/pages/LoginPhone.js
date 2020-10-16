import React from 'react';
import selendra from '../assets/Selendra.png';
import { ReactComponent as Login } from '../assets/Login-ai.svg';
import { ReactComponent as Phone } from '../assets/phone.svg';
import { ReactComponent as Email } from '../assets/email.svg';
import '../styles/LoginPhone.css';
import { Button, Input } from 'antd';

function LoginPhone() {
  return (
    <div className='loginPhone'>
      <div className='loginPhone__container'>
        <div className='loginPhone__section1'>
          <img src={selendra} alt='sel_logo'/>
          <p className='loginPhone__title'>SELENDRA</p>
          <p className='loginPhone__description'>
            A multi-use cases blockchain
            super-app for the Internet 2.0
          </p>
          <Login/>
        </div>
        <div className='loginPhone__section2'>
          <div className='loginPhone__row'>
            <div className='loginPhone__btnSignup'>
              <Button>Sign Up</Button>
            </div>
            <div className='loginPhone__btnLogin'>
              <Button type="link">Login</Button>
            </div>
          </div>
          <div className='loginPhone__row loginPhone__row2'>
            <div className='loginPhone__title'>
              <h1>Welcome Back</h1>
              <p>Login to your <br/>Personal Account</p>
            </div>
            <div className='loginPhone__field'>
              <div className='loginPhone__toggle'>
                <Button icon={<Phone className='icon'/>}></Button>
                <Button icon={<Email className='icon'/>}></Button>
              </div>
              <Input placeHolder='Phone'></Input>
              <Input placeHolder='Email'></Input>
              <div className='loginPhone__btn'>
                <Button>Login</Button>
                <Button>Recovery Password</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPhone
