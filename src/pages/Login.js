// Module
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Components
import { Button, Col, Row } from 'antd';
import { ReactComponent as Phone } from '../assets/phone.svg';
import { ReactComponent as Email } from '../assets/email.svg';
import LoginEmail from '../components/LoginEmail';
import LoginPhone from '../components/LoginPhone';
import AuthLayout from '../components/AuthLayout';
// Styles
import '../styles/auth/Login.css';

export default function Login() {
  const [ isPhone, setIsPhone ] = useState(true);
  const togglePhone = () => setIsPhone(true);
  const toggleEmail = () => setIsPhone(false);

  return (
    <AuthLayout>
      <Row className='login__container'>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <div className='login__headerSignup'>
            <Link to='/signup'>
              <Button>Sign Up</Button>
            </Link>
          </div>
          <Row align='middle' className='login__left'>
            <div className='login__leftTitle'>
              <h1>Welcome Back</h1>
              <p>Login to your <br/>Personal Account</p>
            </div>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Row justify='end'>
            <div className='login__headerLogin'>
              <Link to='/login'>
                <Button type="link">Login</Button>
              </Link>
            </div>
          </Row>
          <Row align='middle' className='login__right'>
            <div className='login__field'>
              <Row justify='end' className='login__toggle'>
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
              </Row>
              { isPhone ? 
                <LoginPhone />
                : 
                <LoginEmail />
              }
            </div>
          </Row>
        </Col>
      </Row>
    </AuthLayout>
  )
}