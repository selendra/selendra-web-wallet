import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/auth/Signup.css';
import selendra from '../assets/Selendra.png';
import { ReactComponent as LoginAI } from '../assets/Login-ai.svg';
import { ReactComponent as Phone } from '../assets/phone.svg';
import { ReactComponent as Email } from '../assets/email.svg';
import { Button } from 'antd';
import SignupEmail from '../components/SignupEmail';
import SignupPhone from '../components/SignupPhone';

function SignUp() {
  const [ isPhone, setIsPhone ] = useState(true);

  const togglePhone = () => {
    setIsPhone(true);
  } 
  const toggleEmail = () => {
    setIsPhone(false);
  } 

  return (
    <div className='signup'>
      <div className='signup__sectionOne'>
        <img src={selendra} alt='sel_logo'/>
        <p className='signup__title'>SELENDRA</p>
        <p className='signup__description'>
          A multi-use cases blockchain
          super-app for the Internet 2.0
        </p>
        <LoginAI className='signup__ai'/>
      </div>
      <div className='signup__sectionTwo'>
        <div className='signup__container'>
          <div className='signup__left'>
            <div className='signup__headerSignup'>
              <Link to='/signup'>
                <Button>Sign Up</Button>
              </Link>
            </div>
            <div className='signup__leftTitle'>
              <h1>Welcome Back</h1>
              <p>Sign Up <br/>Personal Account</p>
            </div>
          </div>
          <div className='signup__right'>
            <div className='signup__headerLogin'>
              <Link to='/login'>
                <Button type="link">Login</Button>
              </Link>
            </div>
            <div className='signup__field'>
              <div className='signup__toggle'>
                <Button 
                  icon={<Phone className='icon'/>} 
                  className={isPhone ? 'signup__toggleActive' : ''}
                  onClick={togglePhone}  
                ></Button>
                <Button 
                  icon={<Email className='icon'/>} 
                  className={!isPhone ? 'signup__toggleActive' : ''}
                  onClick={toggleEmail}
                ></Button>
              </div>
              { isPhone ? <SignupPhone className='phone__component'/> : <SignupEmail className='email__component'/> }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp;