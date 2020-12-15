import React from 'react';
import { Row, Col } from 'antd';
import './styles/auth.css';
import selendra from '../../assets/selendra.png';
import { ReactComponent as LoginAi } from '../../assets/login-ai.svg';

export default function Auth({children}) {
  return (
    <div className='auth'>
      <Row>
        <Col xs={0} sm={0} md={0} lg={8} xl={8}>
          <div className='auth__left'>
            <img src={selendra} alt='selendra' />
            <p>SELENDRA</p>
            <div style={{paddingTop: '10%'}}></div>
            <span>
              A multi-use cases blockchain <br/>
              super-app for the Internet 2.0
            </span>
            <div style={{paddingTop: '10%'}}></div>
            <LoginAi />
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={16} xl={16}>
          <div className='auth__children'>
            {children}
          </div>
        </Col>
      </Row>
    </div>
  )
}