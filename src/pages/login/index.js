import React, { useState } from 'react';
import { Auth, Loginphone, Loginemail } from '../../components';
import { Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import { ReactComponent as Phone } from '../../assets/phone.svg';
import { ReactComponent as Email } from '../../assets/email.svg';
import './styles/login.css';


export default function Login() {
  const [ isPhone, setIsPhone ] = useState(true);
  const togglePhone = () => setIsPhone(true);
  const toggleEmail = () => setIsPhone(false);

  return (
    <Auth>
      <div className='login'>
        <Row className='login__container'>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Row align='middle' className='login__left'>
              <div className='login__greeting'>
                <p>Welcome Back</p>
                <p>Login to your<br/>Pesonal Account</p>
              </div>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Row justify='end' className='login__header'>
              <div className='login__headerSignup'>
                <Link to='/signup'>
                  <Button>SignUp</Button>
                </Link>
              </div>
              <div className='login__headerLogin'>
                <Link to='/login'>
                  <Button type='text'>Login</Button>
                </Link>
              </div>
            </Row>
            <Row align='middle' className='login__formField'>
              <div style={{width: '100%'}}>
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
                  <Loginphone />
                  : 
                  <Loginemail />
                }
              </div>
            </Row>
          </Col>
        </Row>    
      </div>
    </Auth>
  )
}