// Modules
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useHistory } from 'react-router-dom';
import Cookie from 'js-cookie';
import AxiosInstance from '../helpers/AxiosInstance';
// Components
import { Button, Col, Row, Input, message } from 'antd';
import { ReactComponent as Phone } from '../assets/phone.svg';
import { ReactComponent as Email } from '../assets/email.svg';
import SignupEmail from '../components/SignupEmail';
import SignupPhone from '../components/SignupPhone';
import AuthLayout from '../components/AuthLayout';

import { ReactComponent as Lock } from '../assets/lock.svg';

// Styles
import '../styles/auth/Signup.css';

function SignUp() {
  const [ isPhone, setIsPhone ] = useState(true);
  const togglePhone = () => setIsPhone(true);
  const toggleEmail = () => setIsPhone(false);

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCon, setPasswordCon] = useState('');
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleSignup = async () => {
    if(password !== passwordCon) {
      message.error('Password not match!');
    } else {
      setLoading(true);
      await AxiosInstance().post('/registerbyphone', {
        phone: ('+855' + phone.replace(/^0+/, '')),
        password
      })
      .then((res) => {
        if(res.data.message === "Successfully registered!") {
          message.success(res.data.message);
          Cookie.set('phone', phone);
          history.push('/verifyphone');
        } else {
          message.error(res.data.message);
        }
      })
      setLoading(false);
    }
  }
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
              {/* { isPhone ? 
                <SignupPhone /> 
                : 
                <SignupEmail /> 
              } */}
              <div className='signupPhone__field'>
                <div className='signupPhone__input'>
                  <Input 
                    placeholder='Phone'
                    type='tel'
                    onChange={ e => setPhone(e.target.value) }
                    value={phone}
                  ></Input>
                  <Phone className='icon'/>
                </div>
                <div className='signupPhone__input'>
                  <Input
                    placeholder='Password'
                    type='password'
                    onChange={ e => setPassword(e.target.value) }
                    value={password}
                  ></Input>
                  <Lock className='icon'/>
                </div>
                <div className='signupPhone__input'>
                  <Input 
                    placeholder='Confirm Password'
                    type='password'
                    onChange={ e => setPasswordCon(e.target.value) }
                    value={passwordCon}
                  ></Input>
                  <Lock className='icon'/>
                </div>
                <div className='signupPhone__btn'>
                  <Button onClick={handleSignup} loading={loading}>Sign Up</Button>
                </div>
              </div>
            </div>
          </Row>
        </Col>
      </Row>
    </AuthLayout>
  )
}

export default SignUp;