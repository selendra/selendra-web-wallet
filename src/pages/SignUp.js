import React from 'react';
import selendra from '../assets/Selendra.png';
import { ReactComponent as Login } from '../assets/Login-ai.svg';
import { ReactComponent as Phone } from '../assets/phone.svg';
import { ReactComponent as Email } from '../assets/email.svg';
import { ReactComponent as Lock } from '../assets/lock.svg';
import { Button, Input } from 'antd';
import '../styles/Signup.css';

function SignUp() {
  return (
    <div className='signup'>
      <div className='signup__container'>
        <div className='signup__section1'>
          <img src={selendra} alt='sel_logo'/>
          <h1>SELENDRA</h1>
          <p>A multi-use cases blockchain
            super-app for the Internet 2.0
          </p>
          <Login/>
        </div>
        <div className='signup__section2'>
          <div className='signup__row1'>
            <div className='signup__btnSignup'>
              <Button>Sign Up</Button>
            </div>
            <div className='signup__btnLogin'>
              <Button type='link'>Login</Button>
            </div>
          </div>
          <div className='signup__row2'>
            <div className='signup__title'>
              <h1>Welcome Back</h1>
              <p>Sign Up<br/>Personal Account</p>
            </div>
            <div className='signup__field'>
              <div className='signup__toggle'>
                <Button icon={<Phone className='icon'/>}></Button>
                <Button icon={<Email className='icon'/>}></Button>
              </div>
              <div className='signup__input'>
                <Input placeHolder='Phone'></Input>
                <Phone className='icon'/>
              </div>
              <div className='signup__input'>
                <Input placeHolder='Password'></Input>
                <Lock className='icon'/>
              </div>
              <div className='signup__btn'>
                <Button block>Sign Up</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp;