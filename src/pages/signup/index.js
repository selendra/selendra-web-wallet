import React, { useState } from 'react';
import { Auth, Signupphone, Signupemail } from '../../components';
import { Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import { ReactComponent as Phone } from '../../assets/phone.svg';
import { ReactComponent as Email } from '../../assets/email.svg';
import './styles/signup.css';


export default function Signup() {
  const [ isPhone, setIsPhone ] = useState(true);
  const togglePhone = () => setIsPhone(true);
  const toggleEmail = () => setIsPhone(false);

  return (
    <Auth>
      <div className='Signup'>
        <Row className='Signup__container'>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Row align='middle' className='Signup__left'>
              <div className='Signup__greeting'>
                <p>Welcome Back</p>
                <p>Signup to your<br/>Pesonal Account</p>
              </div>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Row justify='end' className='Signup__header'>
              <div className='Signup__headerSignup'>
                <Link>
                  <Button>SignUp</Button>
                </Link>
              </div>
              <div className='Signup__headerLogin'>
                <Link>
                  <Button type='text'>Login</Button>
                </Link>
              </div>
            </Row>
            <Row align='middle' className='Signup__formField'>
              <div style={{width: '100%'}}>
                <Row justify='end' className='Signup__toggle'>
                  <Button
                    icon={<Phone className='icon'/>} 
                    className={isPhone ? 'Signup__toggleActive' : ''}
                    onClick={togglePhone}  
                  ></Button>
                  <Button
                    icon={<Email className='icon'/>} 
                    className={!isPhone ? 'Signup__toggleActive' : ''}
                    onClick={toggleEmail}
                  ></Button>
                </Row>
                { isPhone ? 
                  <Signupphone />
                  : 
                  <Signupemail />
                }
              </div>
            </Row>
          </Col>
        </Row>    
      </div>
    </Auth>
  )
}