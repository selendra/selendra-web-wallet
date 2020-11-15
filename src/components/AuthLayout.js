import React from 'react';
import selendra from '../assets/Selendra.png';
import { ReactComponent as LoginAI } from '../assets/Login-ai.svg';
import '../styles/AuthLayout.css';

function AuthLayout(props) {
  return (
    <div className='authlayout'>
      <div className='authlayout__container'>
        <div className='authlayout__sectionOne'>
          <img src={selendra} alt='sel_logo' />
          <p>SELENDRA</p>
          <span>
            A multi-use cases blockchain <br/>
            super-app for the Internet 2.0
          </span>
          <LoginAI className='authlayout__ai'/>
        </div>
        <div className='authlayout__sectionTwo'>
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout;
