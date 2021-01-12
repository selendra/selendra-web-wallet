import { Row, Col, Button, } from 'antd';
import React, { useState } from 'react'
import { Auth } from '../../components';

import { ReactComponent as Phone } from '../../assets/phone.svg';
import { ReactComponent as Email } from '../../assets/email.svg';
import './styles/forgetpassword.css';
import { ForgetEmail, ForgetPhone } from '../../components';

export default function ForgetPassword() {
  const [ isPhone, setIsPhone ] = useState(true);
  const togglePhone = () => setIsPhone(true);
  const toggleEmail = () => setIsPhone(false);

  return (
    <Auth>
      <div className='forget'>
        <Row className='forget__container' align='middle' style={{height: '100vh'}}>
          <div style={{width: '100%'}}>
            <div className='forget__title'>
              <p>Forget Password</p>
            </div>
            <Row justify='end' className='forget__toggle'>
              <Button
                icon={<Phone className='icon'/>}
                className={isPhone ? 'forget__toggleActive' : ''}
                onClick={togglePhone}
              ></Button>
              <Button
                icon={<Email className='icon'/>}
                className={!isPhone ? 'forget__toggleActive' : ''}
                onClick={toggleEmail}
              ></Button>
            </Row>
            <Row>
              { isPhone ? 
                <ForgetPhone />
                : 
                <ForgetEmail />
              }
            </Row>
          </div>
        </Row>
      </div>
    </Auth>
  )
}