// Modules
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Components
import { Button, Col, Row } from 'antd';
import { ReactComponent as Phone } from '../assets/phone.svg';
import { ReactComponent as Email } from '../assets/email.svg';
import SignupEmail from '../components/SignupEmail';
import SignupPhone from '../components/SignupPhone';
import AuthLayout from '../components/AuthLayout';
// Styles
import '../styles/auth/Signup.css';

function SignUp() {
  const [ isPhone, setIsPhone ] = useState(true);
  const togglePhone = () => setIsPhone(true);
  const toggleEmail = () => setIsPhone(false);

  return (
    <AuthLayout>
      <Row className='signup__container'>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <div className='signup__headerSignup'>
            <Link to='/signup'>
              <Button>Sign Up</Button>
            </Link>
          </div>
          <Row align='middle' className='signup__left'>
            <div className='signup__leftTitle'>
              <h1>Welcome Back</h1>
              <p>Sign Up <br/>Personal Account</p>
            </div>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Row justify='end'>
            <div className='signup__headerLogin'>
              <Link to='/login'>
                <Button type="link">Login</Button>
              </Link>
            </div>
          </Row>
          <Row align='middle' className='signup__right'>
            <div className='signup__field'>
              <Row justify='end' className='signup__toggle'>
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
              </Row>
              { isPhone ? <SignupPhone className='phone__component'/> : <SignupEmail className='email__component'/> }
            </div>
          </Row>
        </Col>
      </Row>
    </AuthLayout>
  )
}

export default SignUp;