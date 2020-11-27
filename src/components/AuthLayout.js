// Modules
import React from 'react';
// Components
import { ReactComponent as LoginAI } from '../assets/Login-ai.svg';
import selendra from '../assets/Selendra.png';
import { Row, Col } from 'antd';
// Styles
import '../styles/auth/AuthLayout.css';

export default function AuthLayout(props) {
  return (
    <div className='authlayout'>
      <Row>
        <Col xs={0} sm={0} md={0} lg={8} xl={8}>
          <div className='authlayout__sectionOne'>
            <img src={selendra} alt='sel_logo' />
            <p>SELENDRA</p>
            <span>
              A multi-use cases blockchain <br/>
              super-app for the Internet 2.0
            </span>
            <LoginAI className='authlayout__ai'/>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={16} xl={16}>
          {props.children}
        </Col>
      </Row>
    </div>
  )
}