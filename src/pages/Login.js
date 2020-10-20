import React, { useState } from 'react';
import '../styles/Login.css';
import selendra from '../assets/Selendra.png';
import { ReactComponent as LoginAI } from '../assets/Login-ai.svg';
import { ReactComponent as Phone } from '../assets/phone.svg';
import { ReactComponent as Email } from '../assets/email.svg';
import { Button } from 'antd';
import LoginEmail from '../components/LoginEmail';
import LoginPhone from '../components/LoginPhone';

function Login() {
  const [ isPhone, setIsPhone ] = useState(true);

  const togglePhone = () => {
    setIsPhone(true);
  } 
  const toggleEmail = () => {
    setIsPhone(false);
  } 

  return (
    <div className='login'>
      <div className='login__container'>
        <div className='login__section1'>
          <img src={selendra} alt='sel_logo'/>
          <p className='login__title'>SELENDRA</p>
          <p className='login__description'>
            A multi-use cases blockchain
            super-app for the Internet 2.0
          </p>
          <LoginAI/>
        </div>
        <div className='login__section2'>
          <div className='login__row'>
            <div className='login__btnSignup'>
              <Button>Sign Up</Button>
            </div>
            <div className='login__btnLogin'>
              <Button type="link">Login</Button>
            </div>
          </div>
          <div className='login__row2'>
            <div className='login__title'>
              <h1>Welcome Back</h1>
              <p>Login to your <br/>Personal Account</p>
            </div>
            <div className='login__field'>
              <div className='login__toggle'>
                <Button 
                  icon={<Phone className='icon'/>} 
                  className={isPhone ? 'login__toggleActive' : ''}
                  onClick={togglePhone}  
                ></Button>
                <Button 
                  icon={<Email className='icon'/>} 
                  className={!isPhone ? 'login__toggleActive' : ''}
                  onClick={toggleEmail}
                ></Button>
              </div>
              { isPhone ? <LoginPhone className='phone__component'/> : <LoginEmail className='email__component'/> }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;